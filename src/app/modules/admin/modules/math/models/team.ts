export interface Team {
  id: string
  name: string
  members: {
    id: string
    school: string
    "class": string
    name?: string
  }[]
}
