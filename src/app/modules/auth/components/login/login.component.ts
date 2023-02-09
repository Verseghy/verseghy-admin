import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { FormControl, FormGroup } from '@angular/forms'
import { exhaustMap, map, Observable, switchMap, tap } from 'rxjs'
import { AuthService } from '../../services/auth.service'
import { BackendError } from '../../../../models/error'
import { Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http'
import { HaveActionService } from '../../../../services/have-action.service'
import { getAllAvailableActions } from '../../../../models/actions'

interface State {
  loading: boolean
  error?: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ComponentStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  /// State
  // Selectors
  readonly loading$ = this.cStore.select((state: State) => state.loading)
  readonly error$ = this.cStore.select((state: State) => state.error)

  // Actions
  readonly successLogin = this.cStore.updater(
    (state): State => ({
      ...state,
      error: '',
    })
  )

  readonly loginError = this.cStore.updater<BackendError | null>(
    (state, value): State => ({
      ...state,
      error: value?.error,
      loading: false,
    })
  )

  readonly setLoading = this.cStore.updater<boolean>(
    (state, value): State => ({ ...state, loading: value })
  )

  // Effects
  readonly submitForm = this.cStore.effect((submit$: Observable<never>) =>
    submit$.pipe(
      tap(() => {
        this.setLoading(true)
      }),
      exhaustMap(() =>
        this.authService
          .login({
            email: this.form.get('email')?.value ?? '',
            password: this.form.get('password')?.value ?? '',
          })
          .pipe(
            tapResponse(
              () => undefined,
              (err: HttpErrorResponse) => this.loginError(err.error)
            ),
            switchMap((resp) => {
              localStorage.setItem('token', resp.token)
              return this.haveActionService
                .haveEitherAction({ actions: getAllAvailableActions() })
                .pipe(
                  tapResponse(
                    () => undefined,
                    (err: HttpErrorResponse) => this.loginError(err.error)
                  ),
                  map((shouldAllow) => {
                    if (!shouldAllow) {
                      return this.loginError({ error: 'No permissions' }) // TODO: something nicer?
                    }
                    this.router.navigate(['/admin/dashboard'])
                    return this.successLogin()
                  })
                )
            })
          )
      )
    )
  )

  constructor(
    private cStore: ComponentStore<State>,
    private authService: AuthService,
    private router: Router,
    private haveActionService: HaveActionService
  ) {
    this.cStore.setState({
      loading: false,
    })
  }
}
