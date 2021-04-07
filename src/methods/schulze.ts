import {
  Ballot,
  Choice,
  ChoicePoints,
  Method,
  PairwiseResult,
  Result
} from '@/types'

export function getSchulzeMethod() {
  const method: Method = {
    id: 'schulze',
    title: 'Schulze',
    description: ''
  }
  return method
}

function pairwiseDefeat(
  choiceA: Choice,
  choiceB: Choice,
  ballots: Ballot[]
): PairwiseResult {
  // Calculate who would win if choice was only between A and B
  // A gets a point for each ballot where A is preferred over B
  // B gets a point for each ballot where B is preferred over A
  const votesA: ChoicePoints = {
    choice: choiceA,
    points: 0
  }
  const votesB: ChoicePoints = {
    choice: choiceB,
    points: 0
  }
  for (let i = 0; i < ballots.length; i++) {
    const ballot = ballots[i]
    for (let j = 0; j < ballot.choices.length; j++) {
      const choice = ballot.choices[j]
      // Whichever candidate is found first gets one vote from this ballot
      if (choice.id === choiceA.id) {
        votesA.points += 1
        break
      }
      if (choice.id === choiceB.id) {
        votesB.points += 1
        break
      }
    }
  }
  console.log(
    choiceA.id +
      ' vs. ' +
      choiceB.id +
      ': ' +
      votesA.points +
      ' - ' +
      votesB.points
  )
  const pairwiseResult = {
    choiceA: votesA,
    choiceB: votesB
  }
  return pairwiseResult
}

function choiceArrayToString(choices: Choice[]): string {
  if (choices.length === 0) {
    return ''
  }
  let choicesString = choices[0].id
  for (let i = 1; i < choices.length; i++) {
    choicesString += ', ' + choices[i].id
  }
  return choicesString
}

export function calculateSchulzeWinners(
  choices: Choice[],
  ballots: Ballot[]
): Result {
  console.log('calculateSchulzeWinners()')
  // A Condorcet method
  // Each candidate is matched against all other candidates in pairwise comparison
  // If there is a candidate that wins against all other candidates, that candidate is winner
  // https://en.wikipedia.org/wiki/Schulze_method
  const losses: { [id: string]: ChoicePoints } = {} // Loss count for each candidate
  const wins: { [id: string]: ChoicePoints } = {} // Win count for each candidate
  const resultMatrix: {
    [id: string]: {
      [id: string]: number
    }
  } = {}

  // Initialize wins and losses for each choice to 0
  for (let i = 0; i < choices.length; i += 1) {
    wins[choices[i].id] = {
      choice: choices[i],
      points: 0
    }
    losses[choices[i].id] = {
      choice: choices[i],
      points: 0
    }
  }

  const pairwiseResults: {
    [id: string]: {
      [id: string]: PairwiseResult
    }
  } = {}

  for (let i = 0; i < choices.length; i++) {
    const choiceA = choices[i]
    const resultMatrixRow: { [id: string]: number } = {}
    const pairwiseResultsRow: {
      [id: string]: PairwiseResult
    } = {}
    const winsAgainst: Choice[] = []
    const losesAgainst: Choice[] = []
    for (let j = 0; j < choices.length; j++) {
      const choiceB = choices[j]
      if (i !== j) {
        // See who would win if choice were between A and B
        const result = pairwiseDefeat(choiceA, choiceB, ballots)
        pairwiseResultsRow[choiceB.id] = result
        resultMatrixRow[choiceB.id] = result.choiceA.points
        // These are not required by Schulze but allow taking a shortcut if we have Condorcet winner
        if (result.choiceA.points > result.choiceB.points) {
          wins[choiceA.id].points += 1
          winsAgainst.push(choiceB)
        } else if (result.choiceA.points < result.choiceB.points) {
          losses[choiceA.id].points += 1
          losesAgainst.push(choiceB)
        }
      }
      pairwiseResults[choiceA.id] = pairwiseResultsRow
    }
    console.log('pairwiseResults:', pairwiseResults)
    resultMatrix[choiceA.id] = resultMatrixRow
    let winsAgainstString = ''
    let losesAgainstString = ''
    if (winsAgainst.length > 0) {
      winsAgainstString = '(against:' + choiceArrayToString(winsAgainst) + ')'
    }
    if (losesAgainst.length > 0) {
      losesAgainstString = '(against:' + choiceArrayToString(losesAgainst) + ')'
    }
    console.log(
      choiceA.id,
      'wins:',
      winsAgainst.length,
      winsAgainstString,
      'losses:',
      losesAgainst.length,
      losesAgainstString
    )
  }

  // See if three is a choice that does not lose to any other choice
  const winners: Choice[] = []
  Object.keys(wins).forEach(id => {
    console.log(id, 'wins: ', wins[id].points, 'losses:', losses[id].points)
    if (wins[id].points > 0) {
      if (losses[id].points === 0) {
        winners.push(wins[id].choice)
      }
    }
  })
  console.log('Winners: ' + choiceArrayToString(winners))

  if (winners.length === 1) {
    const winner = winners[0]
    if (losses[winner.id].points === 0) {
      console.log('Found single undefeated Condorcet winner: ' + winner.id)
    }
  }
  console.log(
    'No clear Condorcet winner. Need to resort to path calculation.(TBD)'
  )

  const p: {
    [id: string]: {
      [id: string]: number
    }
  } = {}

  for (let i = 0; i < choices.length; i++) {
    const a = choices[i].id
    const pRow: { [id: string]: number } = {}
    // let rowString = a + ': '
    for (let j = 0; j < choices.length; j++) {
      const b = choices[j].id
      if (a != b) {
        // rowString += '(' + a + ', ' + b + '): ' + resultMatrix[a][b]
        if (resultMatrix[a][b] > resultMatrix[b][a]) {
          pRow[b] = resultMatrix[a][b]
        } else [(pRow[b] = 0)]
      }
    }
    p[a] = pRow
    // console.log(rowString)
  }

  for (let i = 0; i < choices.length; i++) {
    for (let j = 0; j < choices.length; j++) {
      if (i != j) {
        for (let k = 0; k < choices.length; k++) {
          if (i != k && j != k) {
            const a = choices[i].id
            const b = choices[j].id
            const c = choices[k].id
            p[b][c] = Math.max(p[b][c], Math.min(p[b][a], p[a][c]))
          }
        }
      }
    }
  }

  // Initially all are schulze winners
  const schulzeWinners: { [id: string]: boolean } = {}
  for (let i = 0; i < choices.length; i++) {
    schulzeWinners[choices[i].id] = true
  }

  for (let i = 0; i < choices.length; i++) {
    for (let j = 0; j < choices.length; j++) {
      if (i != j) {
        const a = choices[i].id
        const b = choices[j].id
        if (p[b][a] > p[a][b]) {
          schulzeWinners[a] = false
          console.log(a, 'is not Schulze winner')
        }
      }
    }
  }

  const schulzeWinnerList: Choice[] = []
  // Add every choice that has not been declared as not winner to the winners list
  for (let i = 0; i < choices.length; i++) {
    if (schulzeWinners[choices[i].id] === true) {
      console.log(choices[i].id, 'is a Schulze winner ***')
      schulzeWinnerList.push(choices[i])
    }
  }

  const condorcetWinnersString = choiceArrayToString(winners)
  const schulzeWinnersString = choiceArrayToString(schulzeWinnerList)

  console.log('Condorcet winner(s):', condorcetWinnersString)
  console.log('Schulze winner(s):', schulzeWinnersString)
  if (condorcetWinnersString != schulzeWinnersString) {
    console.warn('Mismatching results')
  }
  const result: Result = {
    winners: schulzeWinnerList,
    method: getSchulzeMethod(),
    points: [],
    pairwiseResults: pairwiseResults
  }

  return result
}
