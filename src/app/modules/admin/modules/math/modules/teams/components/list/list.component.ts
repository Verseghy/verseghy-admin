import {Component, OnInit} from '@angular/core';
import {TeamService} from "../../../../services/team.service";
import {Table, TableHeaderItem, TableItem, TableModel, TableRow} from "carbon-components-angular";
import {map} from "rxjs";

const headers = [
  (() => {
    const t = new TableHeaderItem({ data: $localize`ID` })
    t.sortable = false
    return t
  })(),
  (() => new TableHeaderItem({ data: $localize`Name` }))(),
]

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{
  loaded$ = this.teamService.loaded$
  emptyTableModel = Table.skeletonModel(10, 2)
  model$ = this.teamService.entities$.pipe(
    map(teams => {
      const model = new TableModel()
      model.header = headers
      let data: TableRow[] = []
      for (const team of teams) {
        data = [
          ...data,
          new TableRow(
            new TableItem({ data: team.id }),
            new TableItem({ data: team.name }),
          ),
        ]
      }
      model.data = data
      model.sort(1)
      return model
    })
  )

  constructor(
    private teamService: TeamService
  ) {
  }

  ngOnInit() {
    this.teamService.getAll()
  }
}
