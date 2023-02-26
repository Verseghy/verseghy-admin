import { Injectable } from '@angular/core'
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data'

export interface Action {
  id: string
  name: string
  secure: boolean
}

@Injectable({
  providedIn: 'root',
})
export class ActionService extends EntityCollectionServiceBase<Action> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Action', serviceElementsFactory)
  }
}
