import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { defaultDataConfig } from '../../../services/math-data-service.service'
import { Observable } from 'rxjs'
import { ProblemOrder } from '../models/problem-order'

enum OrderRequestType {
  INSERT = 'INSERT',
  DELETE = 'DELETE',
  SWAP = 'SWAP',
}

@Injectable({
  providedIn: 'root',
})
export class ProblemOrderService {
  private endpointURL
  constructor(private httpClient: HttpClient) {
    this.endpointURL = defaultDataConfig.root
  }

  list(): Observable<ProblemOrder> {
    return this.httpClient.get<ProblemOrder>(
      `${this.endpointURL}/problem/order`
    )
  }

  add(problemID: string): Observable<void> {
    return this.httpClient.post<void>(`${this.endpointURL}/problem/order`, {
      type: OrderRequestType.INSERT,
      id: problemID,
    })
  }

  delete(problemID: string): Observable<void> {
    return this.httpClient.post<void>(`${this.endpointURL}/problem/order`, {
      type: OrderRequestType.DELETE,
      id: problemID,
    })
  }

  swap(id1: string, id2: string): Observable<void> {
    return this.httpClient.post<void>(`${this.endpointURL}/problem/order`, {
      type: OrderRequestType.SWAP,
      id1,
      id2,
    })
  }
}
