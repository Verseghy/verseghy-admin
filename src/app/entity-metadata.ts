import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data'

const entityMetadata: EntityMetadataMap = {
  User: {},
  Action: {},
  Group: {},
  App: {},
  'Math-Problem': {},
}

const pluralNames = {}

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
}
