import { CanLoadFn } from '@angular/router'
import { inject } from '@angular/core'
import { HaveActionService } from '../services/have-action.service'
import { map } from 'rxjs'

export function haveEitherActions({
  actions,
}: {
  actions: string[]
}): CanLoadFn {
  return () => {
    const haveActionService = inject(HaveActionService)
    return haveActionService.haveEitherAction({ actions })
  }
}
