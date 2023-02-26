import { Injectable } from '@angular/core'
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data'

export interface Group {
  id: string
  name: string
}

@Injectable({
  providedIn: 'root',
})
export class GroupsService extends EntityCollectionServiceBase<Group> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Group', serviceElementsFactory)
  }
}
