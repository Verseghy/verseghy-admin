import { Injectable } from '@angular/core'
import { Action } from '../models/actions'
import {
  combineLatest,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environment/environment'
import { TokenService } from './token.service'

@Injectable({
  providedIn: 'root',
})
export class HaveActionService {
  private cache$?: Observable<Action[]>

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {
    this.tokenService.currentUserID$().subscribe((x) => {
      this.cache$ = undefined
    })
  }

  haveEitherAction({ actions }: { actions: string[] }): Observable<boolean> {
    if (!this.cache$) {
      this.cache$ = this.getUserActions(
        this.tokenService.currentUserID() ?? ''
      ).pipe(shareReplay(1))
    }
    return this.cache$.pipe(
      map((userActions) =>
        userActions.some((val) => actions.includes(val.name))
      )
    )
  }

  private getUserActions(currentUserID: string): Observable<Action[]> {
    return this.httpClient.get<Action[]>(
      `${environment.baseIAMURL}/v1/users/${currentUserID}/actions`
    )
  }
}
