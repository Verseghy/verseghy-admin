import { ChangeDetectionStrategy, Component } from '@angular/core'
import { IconService } from 'carbon-components-angular'
import {
  User16,
  Dashboard16,
  WatsonHealthAngle16,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
} from '@carbon/icons'
import { NavigationEnd, Router } from '@angular/router'
import { filter, map, mergeWith, Observable, of } from 'rxjs'
import { actions, iamActions } from "../../models/actions";
import { HaveActionService } from '../../services/have-action.service'

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullComponent {
  hamburgerActive = false
  url$ = of(this.router.url).pipe(
    mergeWith(
      this.router.events.pipe(
        filter((x) => x instanceof NavigationEnd),
        map((x) => (x as NavigationEnd).url)
      )
    )
  )
  actions = actions
  iamActions = iamActions

  constructor(
    private iconService: IconService,
    private router: Router,
    private haveAction: HaveActionService
  ) {
    this.iconService.registerAll([
      User16,
      Dashboard16,
      WatsonHealthAngle16,
    ])
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }

  haveEitherAction({ actions }: { actions: string[] }): Observable<boolean> {
    return this.haveAction.haveEitherAction({ actions })
  }
}
