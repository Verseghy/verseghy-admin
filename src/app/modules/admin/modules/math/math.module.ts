import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MathRoutingModule } from './math-routing.module'
import { EntityDataService, HttpUrlGenerator } from '@ngrx/data'
import {
  MathDataService,
  mathDataServiceFactory,
} from './services/math-data-service.service'
import { Problem } from './modules/problems/services/problem.service'
import { HttpClient } from '@angular/common/http'

@NgModule({
  declarations: [],
  imports: [CommonModule, MathRoutingModule],
  providers: [
    {
      provide: MathDataService<Problem>,
      useFactory: mathDataServiceFactory('Math-Problem'),
      deps: [HttpClient, HttpUrlGenerator],
    },
  ],
})
export default class MathModule {
  constructor(
    entityDataService: EntityDataService,
    problemMathDataService: MathDataService<Problem>
  ) {
    entityDataService.registerServices({
      'Math-Problem': problemMathDataService,
    })
  }
}
