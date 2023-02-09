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
}

export function getAllAvailableActions(): string[] {
  const a: string[] = []
  for (const action of Object.values(actions)) {
    a.push(...action)
  }
  return a
}
