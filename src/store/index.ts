import { createStore } from 'vuex'
import { State, Ballot, Result } from '@/types'

function idFromTitle(title: string): string {
  let newId: string = title.toLowerCase()
  newId = newId.replace(' ', '_')
  return newId
}

export default createStore({
  state () {
    return {
      pollId: 'poll1',
      colors: [
        '#77f',
        '#7f7',
        '#7ff',
        '#f77',
        '#f7f',
        '#ff7',
        '#aaf',
        '#afa',
        '#aff',
        '#faa',
        '#faf',
        '#ffa'
      ],
      choices: [],  // All choices available in this poll
      ballots: [],   // All ballots cast in this poll
      results: []
    }
  },
  mutations: {
    addBallot (state: State, ballot: Ballot) {
      console.log('store:addBallot', ballot)
      state.ballots.push(ballot)
    },
    addChoice (state: State, title: string) {
      const colorIndex: number = state.choices.length
      const color = state.colors[colorIndex]
      const newId: string = idFromTitle(title)
      // TODO: Check that choice with this ID does not yet exist
      console.log('store:addChoice id:', newId, 'title:', title, 'color:', color)
      state.choices.push({ id: newId, title: title, color: color })
    },
    addResult (state: State, result: Result) {
      console.log('store:addResult', result)
      state.results.push(result)
    },
    clearBallots (state: State) {
      console.log('store:clearBallots')
      state.ballots = []
    },
    clearChoices (state: State) {
      console.log('store:clearChoices')
      state.choices = []
    },
    clearResults (state: State) {
      console.log('store:clearResults')
      state.results = []
    },
    setPollId (state: State, pollId: string) {
      console.log('store:setPollId', pollId)
      state.pollId = pollId
    }
  },
  actions: {},
  modules: {}
})
