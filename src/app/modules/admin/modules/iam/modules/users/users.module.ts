import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { UsersRoutingModule } from './users-routing.module'
import { ListComponent } from './components/list/list.component'
import {
  ButtonModule,
  IconModule,
  TableModule,
} from 'carbon-components-angular'

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TableModule,
    ButtonModule,
    IconModule,
  ],
})
export default class UsersModule {}
