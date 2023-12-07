import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsRoutingModule } from './results-routing.module';
import { ListComponent } from './components/list/list.component';
import {ChartsModule} from "@carbon/charts-angular";


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ResultsRoutingModule,
    ChartsModule
  ]
})
export default class ResultsModule { }
