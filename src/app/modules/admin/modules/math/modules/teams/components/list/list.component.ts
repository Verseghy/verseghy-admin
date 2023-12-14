import {Component, OnInit} from '@angular/core';
import {TeamService} from "../../../../services/team.service";
import {Table, TableHeaderItem, TableItem, TableModel, TableRow} from "carbon-components-angular";
import {combineLatestWith, map, tap} from "rxjs";
import {UserService} from "../../../../../../services/user.service";
import {Team} from "../../../../models/team";

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
    combineLatestWith(this.userService.entities$),
    map(([teams, users]) => {
      let retTeams: Team[] = []
      for (let [index1, team] of teams.entries()) {
        let retTeam: Team = {
          id: team.id,
          name: team.name,
          members: []
        }
        for (let [index2, member] of team.members.entries()) {
          retTeam.members.push({
            id: member.id,
            "class": member.class,
            school: member.school,
            name: users.find(user => user.id === `UserID-${member.id}`)?.name ?? $localize`unavailable`
          })
        }
        retTeams.push(retTeam)
      }
      return retTeams
    }),
    map(teams => {
      const model = new TableModel()
      model.header = headers
      let data: TableRow[] = []
      for (const team of teams) {
        data = [
          ...data,
          new TableRow(
            new TableItem({ data: team.id }),
            new TableItem({
              data: team.name,
              expandedData: team.members.map(val => [
                new TableItem({ data: val.school }),
                new TableItem({ data: `${val.name} (${val.class})` })
              ]),
              expandAsTable: true
            }),
          ),
        ]
      }
      model.data = data
      model.sort(1)
      return model
    })
  )

  constructor(
    private teamService: TeamService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.teamService.getAll()
    this.userService.getAll()
  }
}
