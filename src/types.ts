export interface Choice {
  id: string
  title: string
  color: string
}

export interface Ballot {
  voterId: string,
  choices: Choice[]
}

export interface State {
  pollId: string,
  colors: string[]
  choices: Choice[]
  ballots: Ballot[]
}
