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
import { AppsService } from '../../services/apps.service'

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
  model$ = this.appsService.entities$.pipe(
    map((apps) => {
      const model = new TableModel()
      model.header = headers
      let data: TableRow[] = []
      for (const app of apps) {
        data = [
          ...data,
          new TableRow(
            new TableItem({ data: app.id }),
            new TableItem({ data: app.name })
          ),
        ]
      }
      model.data = data
      return model
    })
  )

  constructor(
    private appsService: AppsService,
    private iconService: IconService
  ) {
    this.iconService.registerAll([TrashCan16])
  }

  ngOnInit() {
    this.appsService.getAll()
  }
}
