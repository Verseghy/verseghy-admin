import { Injectable } from '@angular/core'
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data'
import { Team } from '../models/team'

@Injectable({
  providedIn: 'root',
})
export class TeamService extends EntityCollectionServiceBase<Team> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Math-Team', serviceElementsFactory)
  }
}
