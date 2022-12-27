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

@NgModule({
  declarations: [LoginComponent],
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
