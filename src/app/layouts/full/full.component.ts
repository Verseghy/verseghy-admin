import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { IconService } from 'carbon-components-angular'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { User16, Dashboard16 } from '@carbon/icons'
import { NavigationEnd, Router } from '@angular/router'
import { filter, map, mergeWith, of } from 'rxjs'

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

  constructor(private iconService: IconService, private router: Router) {
    this.iconService.registerAll([User16, Dashboard16])
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }
}
