import { Component } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { BackendError } from '../../../../models/error'
import { exhaustMap, map, Observable, tap } from 'rxjs'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { HttpErrorResponse } from '@angular/common/http'
import { AuthService } from '../../services/auth.service'

interface State {
  loading: boolean
  error?: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ComponentStore],
})
export class RegisterComponent {
  readonly form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    name: new FormControl(''),
  })
  userID = ''

  /// State
  // Selectors
  readonly loading$ = this.cStore.select((state: State) => state.loading)
  readonly error$ = this.cStore.select((state: State) => state.error)

  // Actions
  readonly successRegister = this.cStore.updater(
    (state): State => ({
      ...state,
      error: '',
    })
  )

  readonly registerError = this.cStore.updater<BackendError | null>(
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
          .register({
            email: this.form.controls.email.value ?? '',
            password: this.form.controls.password.value ?? '',
            name: this.form.controls.name.value ?? '',
          })
          .pipe(
            tapResponse(
              () => undefined,
              (err: HttpErrorResponse) => this.registerError(err.error)
            ),
            map((resp) => {
              this.setLoading(false)
              this.userID = resp.id
            })
          )
      )
    )
  )

  constructor(
    private cStore: ComponentStore<State>,
    private authService: AuthService
  ) {
    this.cStore.setState({
      loading: false,
    })
  }
}
