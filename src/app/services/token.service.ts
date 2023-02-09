import { Injectable } from '@angular/core'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { filter, fromEvent, map, mergeWith, Observable, of, tap } from 'rxjs'

export interface JWTClaims extends JwtPayload {} // eslint-disable-line

// TODO: Memoize?
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  currentUserID$(): Observable<string | null> {
    const token = localStorage.getItem('token')
    return of(token ? jwtDecode<JWTClaims>(token).sub ?? null : null).pipe(
      mergeWith(
        fromEvent<StorageEvent>(window, 'storage').pipe(
          tap(console.log),
          filter((event: StorageEvent) => event.key === 'token'),
          map(({ newValue }: StorageEvent) =>
            newValue ? jwtDecode<JWTClaims>(newValue).sub ?? null : null
          )
        )
      )
    )
  }

  currentUserID(): string | null {
    const token = localStorage.getItem('token')
    return token ? jwtDecode<JWTClaims>(token).sub ?? null : null
  }
}
