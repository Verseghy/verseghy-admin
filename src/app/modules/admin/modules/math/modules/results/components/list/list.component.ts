import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../../../../environment/environment";
import {forkJoin, map} from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  data: any = []

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    let promises = []
    for (let i = new Date("2023-03-14T13:00:00Z"); i <= new Date("2023-03-14T17:00:00Z"); i.setMinutes(i.getMinutes() + 10)) {
      let z = new Date(i)
      /*this.http.post<{correct: number, team_id: string}[]>(`${environment.baseMathcompetitionURL}/stats`, {timestamp: z.toISOString()}).subscribe(x => {
        for (const y of x) {
          this.data = [...this.data, {timestamp: z.toISOString(), correct: y.correct, team: y.team_id}]
        }
      })*/
      promises.push(this.http.post<{correct: number, team_id: string}[]>(`${environment.baseMathcompetitionURL}/stats`, {timestamp: z.toISOString()}).pipe(
        map(x => ({data: x, timestamp: z}))
      ))
    }
    forkJoin(promises).subscribe(w => {
      let data = []
      for (const timestamp of w) {
        console.log(timestamp)
        for (const teams of timestamp.data) {
          data.push({timestamp: timestamp.timestamp.toISOString(), correct: teams.correct, team: teams.team_id})
        }
      }
      this.data = data
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
    height: "1000px",
    zoomBar: {
      top: {
        enabled: true
      }
    }
  }
}
