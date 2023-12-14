import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data'
import { Problem } from './modules/admin/modules/math/modules/problems/models/problem'
import {Team} from "./modules/admin/modules/math/models/team";

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
  'Math-Team': {
    filterFn: (entities: Team[], pattern) => {
      return entities.filter((value) => value.name.includes(pattern))
    },
  },
}

const pluralNames = {}

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
}
