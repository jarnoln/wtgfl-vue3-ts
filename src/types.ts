export interface Choice {
  id: string
  title: string
  color: string
}

export interface Ballot {
  voterId: string
  choices: Choice[] // List of choices in order of preference
}

export interface ChoicePoints {
  choice: Choice
  points: number
}

export interface PairwiseResult {
  choiceA: ChoicePoints
  choiceB: ChoicePoints
}

export interface Result {
  winners: Choice[] // Usually just one, but in case of tie there may be more
  method: string // Method used to calculate the result
  points: ChoicePoints[] // Points (or votes) received by each choice
  pairwiseResults: {
    [id: string]: {
      [id: string]: PairwiseResult
    }
  }
}

export interface Poll {
  id: string
  title: string
  description: string
}

export interface State {
  poll: Poll
  colors: string[]
  choices: Choice[]
  ballots: Ballot[]
  results: Result[]
}
