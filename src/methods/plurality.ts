import { Ballot, Choice, ChoicePoints, Result } from '@/types'

export function calculatePluralityWinners(ballots: Ballot[]): Result {
  console.log('calculatePluralityWinners()')
  // Give one point the first choice of each ballot, ignoring any choices after that.
  // The choice(s) with most points wins.
  // https://en.wikipedia.org/wiki/Plurality_voting
  const counts: { [id: string]: ChoicePoints } = {} // This keeps track of vote counts for each choice
  for (let i = 0; i < ballots.length; i++) {
    const ballot = ballots[i]
    const choices = ballot.choices
    if (choices.length > 0) {
      const firstChoice = choices[0]
      const id = firstChoice.id
      if (Object.keys(counts).includes(id)) {
        counts[id].points += 1
      } else {
        const cp: ChoicePoints = {
          choice: firstChoice,
          points: 1
        }
        counts[id] = cp
      }
      console.log(id, 'votes:', counts[id])
    }
  }

  // Find out who has most votes
  let winners: Choice[] = []
  const points: ChoicePoints[] = []
  let maxVotes = 0
  Object.keys(counts).forEach(key => {
    points.push(counts[key])
    const votes = counts[key].points
    const choice = counts[key].choice
    console.log('Votes for ' + key + ': ' + votes)
    if (votes > maxVotes) {
      // If current choice has more votes than current winner, make this the new winner
      maxVotes = votes
      winners = [choice]
      console.log(key, 'is the current winner')
    } else if (votes == maxVotes) {
      // If current choice has as many votes as current winner, add it to list of winners
      winners.push(choice)
      console.log(key, 'added to winners')
    }
  })

  const result: Result = {
    winners: winners,
    method: 'plurality',
    points: points,
    pairwiseResults: {}
  }
  return result
}
