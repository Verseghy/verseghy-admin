import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { ListComponent } from './components/list/list.component';
import {ButtonModule, DialogModule, IconModule, TableModule} from "carbon-components-angular";


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    ButtonModule,
    DialogModule,
    IconModule,
    TableModule
  ]
})
export default class TeamsModule { }
