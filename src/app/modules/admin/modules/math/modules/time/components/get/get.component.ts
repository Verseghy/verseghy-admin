import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../../../../../../environment/environment'

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.scss']
})
export class GetComponent implements OnInit {
  start_date = new Date("1970/01/01 00:00:00");
  end_date = new Date("1970/01/01 00:00:00");


  form_start_date = "";
  form_start_time = "";
  form_end_date = "";
  form_end_time = "";

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.fetchTime()
  }

  fetchTime(): void {
    this.http
      .get<{ start_time: number; end_time: number }>(
        `${environment.baseMathcompetitionURL}/v1/competition/time`
      )
      .subscribe((x) => {
        this.start_date = new Date(x.start_time * 1000);
        this.end_date = new Date(x.end_time * 1000);
      })
  }

  submit(): void {
    this.http
      .patch<{ start_time: number; end_time: number }>(
        `${environment.baseMathcompetitionURL}/v1/competition/time`,
        {
          start_time:
            new Date(this.form_start_date).setHours(
              parseInt(this.form_start_time.split(':')[0]),
              parseInt(this.form_start_time.split(':')[1])
            ) / 1000,
          end_time:
            new Date(this.form_end_date).setHours(
              parseInt(this.form_end_time.split(':')[0]),
              parseInt(this.form_end_time.split(':')[1])
            ) / 1000,
        }
      )
      .subscribe(() => this.fetchTime())
  }
}
