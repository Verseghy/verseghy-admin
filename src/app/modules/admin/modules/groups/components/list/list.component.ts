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
import { GroupsService } from '../../services/groups.service'

const headers = [
  new TableHeaderItem({ data: $localize`ID` }),
  new TableHeaderItem({ data: $localize`Name` }),
]

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  emptyTableModel = new TableModel()
  model$ = this.groupsService.entities$.pipe(
    map((groups) => {
      const model = new TableModel()
      model.header = headers
      let data: TableRow[] = []
      for (const group of groups) {
        data = [
          ...data,
          new TableRow(
            new TableItem({ data: group.id }),
            new TableItem({ data: group.name })
          ),
        ]
      }
      model.data = data
      return model
    })
  )

  constructor(
    private groupsService: GroupsService,
    private iconService: IconService
  ) {
    this.iconService.registerAll([TrashCan16])
  }

  ngOnInit() {
    this.groupsService.getAll()
  }
}
