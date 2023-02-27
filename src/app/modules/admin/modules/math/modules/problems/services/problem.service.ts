import { Injectable } from '@angular/core'
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data'

export interface Problem {
  id: string
  body: string
  solution: string
  image?: string
}

@Injectable({
  providedIn: 'root',
})
export class ProblemService extends EntityCollectionServiceBase<Problem> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Math-Problem', serviceElementsFactory)
  }
}
