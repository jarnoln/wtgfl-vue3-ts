import { createStore } from 'vuex'
import { State, Ballot, Choice, Method, Poll, Result } from '@/types'
import { getApprovalMethod } from '@/methods/approval'
import { getPluralityMethod } from '@/methods/plurality'
import { getSchulzeMethod } from '@/methods/schulze'
import EventService from '@/services/EventService'
// import { renderSlot } from '@vue/runtime-core'

function idFromTitle(title: string): string {
  let newId: string = title.toLowerCase()
  newId = newId.replace(' ', '_')
  return newId
}

export default createStore({
  state() {
    return {
      poll: {
        id: '',
        title: '',
        description: '',
        public: true,
        method: getSchulzeMethod()
      },
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
      polls: [], // All (public) polls
      choices: [], // All choices available in this poll
      ballots: [], // All ballots cast in this poll
      methods: [], // All available vote calculation methods
      results: [] // Poll results calculated from ballots
    }
  },
  mutations: {
    addBallot(state: State, ballot: Ballot) {
      console.log('store:addBallot', ballot)
      state.ballots.push(ballot)
    },
    addChoice(state: State, choice: Choice) {
      console.log('store:addChoice', choice)
      state.choices.push(choice)
    },
    createChoice(state: State, title: string) {
      const colorIndex: number = state.choices.length
      const color = state.colors[colorIndex]
      const newId: string = idFromTitle(title)
      // TODO: Check that choice with this ID does not yet exist
      console.log(
        'store:addChoice id:',
        newId,
        'title:',
        title,
        'color:',
        color
      )
      state.choices.push({ id: newId, title: title, color: color })
    },
    addPoll(state: State, poll: Poll) {
      console.log('store:addPoll', poll)
      state.polls.push(poll)
    },
    addResult(state: State, result: Result) {
      console.log('store:addResult', result)
      state.results.push(result)
    },
    clearPolls(state: State) {
      console.log('store:clearPolls')
      state.polls = []
    },
    clearBallots(state: State) {
      console.log('store:clearBallots')
      state.ballots = []
    },
    clearChoices(state: State) {
      console.log('store:clearChoices')
      state.choices = []
    },
    clearResults(state: State) {
      console.log('store:clearResults')
      state.results = []
    },
    setPollId(state: State, pollId: string) {
      console.log('store:setPollId', pollId)
      state.poll.id = pollId
    },
    setPoll(state: State, poll: Poll) {
      console.log('store:setPoll', poll)
      {
        state.poll = poll
      }
    },
    addMethod(state: State, method: Method) {
      console.log('store:addMethod', method)
      state.methods.push(method)
    }
  },
  actions: {
    addExampleChoices(context) {
      // Add automatically some example choices, mostly to help testing.
      context.commit('clearResults')
      context.commit('clearChoices')
      context.commit('clearBallots')
      context.commit('createChoice', 'Hamburger Hut')
      context.commit('createChoice', 'Pizza Palace')
      context.commit('createChoice', 'Taco Terrace')
      context.commit('createChoice', 'Sushi Stall')
    },
    addMethods(context) {
      context.commit('addMethod', getApprovalMethod())
      context.commit('addMethod', getPluralityMethod())
      context.commit('addMethod', getSchulzeMethod())
    },
    loadPolls(context) {
      // Load all (public) polls from backend
      console.log('store:loadPolls')
      context.commit('clearPolls')
      EventService.getPolls()
        .then(response => {
          console.log(response.data)
          for (let i = 0; i < response.data.length; i++) {
            const item = response.data[i]
            // console.log(item)
            const poll: Poll = {
              id: item.fields.name,
              title: item.fields.title,
              description: item.fields.description,
              public: true,
              method: getSchulzeMethod()
            }
            context.commit('addPoll', poll)
          }
        })
        .catch((error: string) => {
          console.log(error)
        })
    },
    loadChoices(context, poll: Poll) {
      console.log('store:loadChoices')
      context.commit('clearChoices')
      EventService.getChoices(poll)
        .then(response => {
          console.log(response.data)
          for (let i = 0; i < response.data.length; i++) {
            const item = response.data[i]
            console.log(item)
            const choice: Choice = {
              id: item.fields.name,
              title: item.fields.title,
              color: item.fields.color
            }
            context.commit('addChoice', choice)
          }
        })
        .catch((error: string) => {
          console.log(error)
        })
    }
  },
  modules: {}
})
