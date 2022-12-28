import { Component } from '@angular/core'
import { UserService } from '../../services/user.service'
import {
  IconService,
  TableHeaderItem,
  TableModel,
} from 'carbon-components-angular'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TrashCan16 } from '@carbon/icons'

const headers = [
  new TableHeaderItem({ data: $localize`ID` }),
  new TableHeaderItem({ data: $localize`Name` }),
  new TableHeaderItem({ data: $localize`Email` }),
]

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  users$ = this.userService.getAll()
  model = new TableModel()

  constructor(
    private userService: UserService,
    private iconService: IconService
  ) {
    this.iconService.registerAll([TrashCan16])
    this.model.header = headers
  }
}
