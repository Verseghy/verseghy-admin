import {
  DefaultDataService,
  DefaultDataServiceConfig,
  HttpUrlGenerator,
} from '@ngrx/data'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../../../environment/environment'

export const defaultDataConfig: DefaultDataServiceConfig = {
  root: environment.baseMathcompetitionURL,
}

export const mathDataServiceFactory =
  (entityName: string) =>
  (http: HttpClient, httpUrlGenerator: HttpUrlGenerator) =>
    new MathDataService(entityName, http, httpUrlGenerator)

export class MathDataService<T> extends DefaultDataService<T> {
  constructor(
    entityName: string,
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator
  ) {
    httpUrlGenerator.registerHttpResourceUrls({
      'Math-Problem': {
        entityResourceUrl: `${defaultDataConfig.root}/problem/`,
        collectionResourceUrl: `${defaultDataConfig.root}/problem/`,
      },
      'Math-Team': {
        entityResourceUrl: `${defaultDataConfig.root}/team/`,
        collectionResourceUrl: `${defaultDataConfig.root}/team/`,
      },
    })
    super(entityName, http, httpUrlGenerator, defaultDataConfig)
  }
}
