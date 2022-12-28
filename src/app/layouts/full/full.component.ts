import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { IconService } from 'carbon-components-angular'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { User16 } from '@carbon/icons'
import { Router } from '@angular/router'

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullComponent {
  hamburgerActive = false

  constructor(private iconService: IconService, private router: Router) {
    this.iconService.registerAll([User16])
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }
}
