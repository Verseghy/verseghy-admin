export interface Action {
  id: string
  name: string
  secure: boolean
}

export const actions = {
  USERS: [
    'iam.user.add',
    'iam.user.get',
    'iam.user.list',
    'iam.user.update',
    'iam.user.delete',
  ],
  ACTIONS: [
    'iam.action.add',
    'iam.action.get',
    'iam.action.list',
    'iam.action.update',
    'iam.action.delete',
  ],
  GROUPS: [
    'iam.group.add',
    'iam.group.get',
    'iam.group.list',
    'iam.group.update',
    'iam.group.delete',
  ],
  APP: [
    'iam.apps.create',
    'iam.apps.get',
    'iam.apps.list',
    'iam.apps.update',
    'iam.apps.delete',
  ],
  MATHCOMPETITION: [
    'mathcompetition.admin', // order, time change
    'mathcompetition.problems', // add/edit/delete problem
  ],
}

export const iamActions = [
  ...actions.ACTIONS,
  ...actions.APP,
  ...actions.USERS,
  ...actions.GROUPS,
]

export function getAllAvailableActions(): string[] {
  const a: string[] = []
  for (const action of Object.values(actions)) {
    a.push(...action)
  }
  return a
}
