import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ActionsRoutingModule } from './actions-routing.module'
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
    ActionsRoutingModule,
    TableModule,
    ButtonModule,
    IconModule,
  ],
})
export default class ActionsModule {}
