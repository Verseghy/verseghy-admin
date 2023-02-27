import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ProblemsRoutingModule } from './problems-routing.module'
import { ListComponent } from './components/list/list.component'
import { ButtonModule, IconModule, InputModule, ModalModule, TableModule } from "carbon-components-angular";
import { AddEditComponent } from './components/add-edit/add-edit.component';

@NgModule({
  declarations: [ListComponent, AddEditComponent],
  imports: [CommonModule, ProblemsRoutingModule, TableModule, ButtonModule, IconModule, ModalModule, InputModule]
})
export default class ProblemsModule {}
