export interface Choice {
  id: string
  title: string
  color: string
}

export interface Ballot {
  voterId: string,
  choices: Choice[]  // List of choices in order of preference
}

export interface Result {
  winners: Choice[],  // Usually just one, but in case of tie there may be more
  method: string
}

export interface State {
  pollId: string,
  colors: string[]
  choices: Choice[]
  ballots: Ballot[]
  results: Result[]
}
