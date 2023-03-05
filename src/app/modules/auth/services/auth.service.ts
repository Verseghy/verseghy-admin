import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../../../environment/environment'

export interface LoginRequest {
  email: string
  password: string
}
export interface LoginResponse {
  token: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
}
export interface RegisterResponse {
  id: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(req: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      `${environment.baseIAMURL}/v1/users/login`,
      req
    )
  }

  register(req: RegisterRequest): Observable<RegisterResponse> {
    return this.httpClient.post<RegisterResponse>(
      `${environment.baseIAMURL}/v1/users/register`,
      req
    )
  }
}
