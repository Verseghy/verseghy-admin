import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data'

const entityMetadata: EntityMetadataMap = {
  User: {},
  Action: {},
  Group: {},
}

const pluralNames = {}

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
}
