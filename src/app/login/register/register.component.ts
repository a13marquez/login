import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { NewUSer, UserFormGroup } from 'src/models/User.model';
import { RegisterService } from '../register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
  public readonly destroy$ = new Subject();
  private validatorsPatterns: { [key: string]: RegExp } = {
    atLeastOneUppercase: /^.*[A-Z].*$/,
    atLeastOneLowercase: /^.*[a-z].*$/
  };

  private passwordValidator = Validators.compose([
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(this.validatorsPatterns.atLeastOneUppercase),
    Validators.pattern(this.validatorsPatterns.atLeastOneLowercase)
  ]);


  public registerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', this.passwordValidator]
  }) as UserFormGroup
  public hidePassword = true;


  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService
  ) { }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  getRequired(controlName: keyof NewUSer) {
    return this.registerForm.controls[controlName].hasError('required')
  }

  getErrorMessage(controlName: keyof NewUSer) {
    if (this.getRequired(controlName)) {
      return 'You must enter a value';
    }
    return this.registerForm.controls[controlName].hasError(controlName) ?
      `Not a valid ${controlName}` : '';
  }

  getPasswordError() {
    if (this.getRequired('password')) {
      return 'You must enter a value';
    }

    return this.registerForm.controls.password.errors ?
      `The password must have a minimum length of 8 characters and contain at least one uppercase and one lowercase` : '';
  }

  registerUser(user: NewUSer) {
    this.registerService.postUser(user)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => of(error)),
      )
      .subscribe((response) => {
        console.log(response)
      },
        (error) => console.error(error)
      )
  }
}

