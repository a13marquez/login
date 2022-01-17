import { AbstractControl, FormGroup } from '@angular/forms';

export type GenericFormControls<T> = {
  [key in keyof T]: AbstractControl;
};

export type GenericFormGroup<T> = FormGroup & {
  value: T;
  controls: GenericFormControls<T>;
};

