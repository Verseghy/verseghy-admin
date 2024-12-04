import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../../../../environment/environment";
import {combineLatestWith, filter, forkJoin, interval, map} from "rxjs";
import {TeamService} from "../../../../services/team.service";
import {SubSink} from "subsink";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  subsink = new SubSink()
  data: any = []

  constructor(
    private http: HttpClient,
    private teamService: TeamService,
  ) {
  }

  ngOnInit() {
    this.teamService.getAll()

    this.fetchUpdate()
    this.subsink.sink = interval(10 * 1000).subscribe(x => this.fetchUpdate())
  }

  ngOnDestroy() {
    this.subsink.unsubscribe()
  }

  fetchUpdate() {
    console.log("fetching update", new Date())
    let promises = []
    for (let i = new Date("2023-12-15T13:00:00Z"); i <= new Date("2023-12-15T17:00:00Z"); i.setMinutes(i.getMinutes() + 10)) {
      let z = new Date(i)
      promises.push(this.http.post<{correct: number, team_id: string}[]>(`${environment.baseMathcompetitionURL}/v1/stats`, {timestamp: z.toISOString()}).pipe(
        map(x => ({data: x, timestamp: z}))
      ))
    }
    forkJoin(promises)
      .pipe(
        combineLatestWith(this.teamService.entities$),
        map(([w, teamsData]) => {
          let data = []
          for (const timestamp of w) {
            for (const teams of timestamp.data) {
              data.push({timestamp: timestamp.timestamp.toISOString(), correct: teams.correct, team: teamsData.find(t => t.id == teams.team_id)?.name ?? teams.team_id})
            }
          }
          this.data = data
        })
      )
      .subscribe(w => {})
  }

  options = {
    title: "Results",
    data: {
      groupMapsTo: "team",
    },
    axes: {
      bottom: {
        title: "Time",
        mapsTo: "timestamp",
        scaleType: "time",
      },
      left: {
        title: "Correct",
        mapsTo: "correct",
        scaleType: "linear"
      }
    },
    curve: "curveMonotoneX",
    height: "800px",
  }
}
