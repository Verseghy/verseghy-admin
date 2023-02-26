import { Injectable } from '@angular/core'
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data'

export interface App {
  id: string
  name: string
}

@Injectable({
  providedIn: 'root',
})
export class AppsService extends EntityCollectionServiceBase<App> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('App', serviceElementsFactory)
  }
}
