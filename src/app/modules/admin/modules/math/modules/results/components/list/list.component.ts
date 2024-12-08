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
    this.http
      .get<{ start_time: number; end_time: number }>(
        `${environment.baseMathcompetitionURL}/v1/competition/time`
      )
      .subscribe((x) => {
        const start_date = new Date(x.start_time * 1000);
        const end_date = new Date(x.end_time * 1000);

        let promises = []
        for (let i = start_date; i <= end_date; i.setMinutes(i.getMinutes() + 10)) {
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
      })
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
