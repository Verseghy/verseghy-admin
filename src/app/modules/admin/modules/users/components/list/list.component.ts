import { Component } from '@angular/core'
import { UserService } from '../../services/user.service'
import { Table } from 'carbon-components-angular'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  users$ = this.userService.getAll()
  loading$ = this.userService.loading$
  skeletonModel = Table.skeletonModel(25, 5)

  constructor(private userService: UserService) {}
}
