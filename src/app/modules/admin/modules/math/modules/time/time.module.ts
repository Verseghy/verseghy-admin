import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'

import { TimeRoutingModule } from './time-routing.module';
import { GetComponent } from './components/get/get.component';
import { ButtonModule, DatePickerModule, TimePickerModule } from 'carbon-components-angular'
import { FormsModule } from '@angular/forms'


@NgModule({
  declarations: [
    GetComponent
  ],
  imports: [
    CommonModule,
    TimeRoutingModule,
    DatePickerModule,
    TimePickerModule,
    ButtonModule,
    FormsModule,
  ]
})
export default class TimeModule { }
