import { Injectable } from '@angular/core'
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data'
import { Problem } from '../models/problem'

@Injectable({
  providedIn: 'root',
})
export class ProblemService extends EntityCollectionServiceBase<Problem> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Math-Problem', serviceElementsFactory)
  }
}
