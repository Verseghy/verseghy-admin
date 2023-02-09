import { Component, OnInit } from '@angular/core'
import {
  IconService,
  TableHeaderItem,
  TableItem,
  TableModel,
  TableRow,
} from 'carbon-components-angular'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TrashCan16 } from '@carbon/icons'
import { map } from 'rxjs'
import { ActionService } from '../../services/action.service'

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
export class ListComponent implements OnInit {
  emptyTableModel = new TableModel()
  model$ = this.actionService.entities$.pipe(
    map((users) => {
      const model = new TableModel()
      model.header = headers
      let data: TableRow[] = []
      for (const user of users) {
        data = [
          ...data,
          new TableRow(
            new TableItem({ data: user.id }),
            new TableItem({ data: user.name }),
            new TableItem({ data: user.email })
          ),
        ]
      }
      model.data = data
      return model
    })
  )

  constructor(
    private actionService: ActionService,
    private iconService: IconService
  ) {
    this.iconService.registerAll([TrashCan16])
  }

  ngOnInit() {
    this.actionService.getAll()
  }
}
