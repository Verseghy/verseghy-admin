import { Injectable } from '@angular/core'
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data'

export interface User {
  id: string
  email: string
  name: string
}

@Injectable({
  providedIn: 'root',
})
export class ActionService extends EntityCollectionServiceBase<User> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Action', serviceElementsFactory)
  }
}
