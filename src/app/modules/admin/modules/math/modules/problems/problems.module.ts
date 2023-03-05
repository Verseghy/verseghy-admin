import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ProblemsRoutingModule } from './problems-routing.module'
import { ListComponent } from './components/list/list.component'
import {
  ButtonModule,
  DialogModule,
  FileUploaderModule, GridModule,
  IconModule, InlineLoadingModule,
  InputModule,
  ModalModule,
  TableModule,
  TilesModule
} from "carbon-components-angular";
import { AddEditComponent } from './components/add-edit/add-edit.component'
import { ReactiveFormsModule } from '@angular/forms'
import { KatexModule } from 'ng-katex'

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
    DialogModule,
    TilesModule,
    KatexModule,
    GridModule,
    InlineLoadingModule
  ]
})
export default class ProblemsModule {}
