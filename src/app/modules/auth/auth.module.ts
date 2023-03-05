import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AuthRoutingModule } from './auth-routing.module'
import { LoginComponent } from './components/login/login.component'
import {
  ButtonModule,
  InlineLoadingModule,
  InputModule,
  NotificationModule,
} from 'carbon-components-angular'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RegisterComponent } from './components/register/register.component'

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    InputModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InlineLoadingModule,
    NotificationModule,
  ],
})
export default class AuthModule {}
