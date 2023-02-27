import { Injectable } from '@angular/core'
import {
  DefaultDataService,
  DefaultDataServiceConfig,
  HttpUrlGenerator,
} from '@ngrx/data'
import { HttpClient } from '@angular/common/http'

const defaultDataConfig: DefaultDataServiceConfig = {
  root: 'http://localhost:3002/',
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
        entityResourceUrl: `${defaultDataConfig.root}problem`,
        collectionResourceUrl: `${defaultDataConfig.root}problem`,
      },
    })
    super(entityName, http, httpUrlGenerator, defaultDataConfig)
  }
}
