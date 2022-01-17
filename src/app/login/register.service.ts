import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUSer } from 'src/models/User.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private baseApi = 'https://demo-api.now.sh'

  constructor(private http: HttpClient) { }

  postUser(user: NewUSer) {
    return this.http.post(`${this.baseApi}/users`, user)
  }
}
