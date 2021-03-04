export interface Choice {
  id: string
  title: string
  color: string
}

export interface State {
  pollId: string,
  colors: string[]
  choices: Choice[]
}
