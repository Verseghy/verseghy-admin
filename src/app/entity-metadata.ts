import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data'
import { Problem } from './modules/admin/modules/math/modules/problems/models/problem'

const entityMetadata: EntityMetadataMap = {
  User: {},
  Action: {},
  Group: {},
  App: {},
  'Math-Problem': {
    filterFn: (entities: Problem[], pattern) => {
      return entities.filter((value) => value.body.includes(pattern))
    },
  },
}

const pluralNames = {}

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
}
