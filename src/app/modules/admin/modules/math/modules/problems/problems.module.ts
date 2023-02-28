import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ProblemsRoutingModule } from './problems-routing.module'
import { ListComponent } from './components/list/list.component'
import {
  ButtonModule,
  FileUploaderModule,
  IconModule,
  InputModule,
  ModalModule,
  TableModule,
} from 'carbon-components-angular'
import { AddEditComponent } from './components/add-edit/add-edit.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [ListComponent, AddEditComponent],
  imports: [
    CommonModule,
    ProblemsRoutingModule,
    TableModule,
    ButtonModule,
    IconModule,
    ModalModule,
    InputModule,
    FileUploaderModule,
    ReactiveFormsModule,
  ],
})
export default class ProblemsModule {}
