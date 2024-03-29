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
      // Currently selected poll
      poll: {
        id: '',
        title: '',
        description: '',
        public: true, // Is poll visible in public poll list
        saved: true, // Has poll been saved after any changes
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
      state.choices.push({
        id: newId,
        title: title,
        color: color,
        description: ''
      })
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
      state.poll = poll
    },
    setPollSaved(state: State, saved: boolean) {
      console.log('store:setPollSaved', saved)
      state.poll.saved = saved
    },
    clearPoll(state: State) {
      console.log('store:clearPoll')
      state.poll.id = ''
      state.poll.title = ''
      state.poll.description = ''
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
    deletePoll(context, pollId: string) {
      // Delete poll from backend, then reload all polls
      console.log('store:deletePoll', pollId)
      EventService.deletePoll(pollId).then(() => context.dispatch('loadPolls'))
      context.commit('clearPoll')
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
              saved: true,
              method: getSchulzeMethod()
            }
            context.commit('addPoll', poll)
          }
        })
        .catch((error: string) => {
          console.log(error)
        })
    },
    loadChoicesAndBallots(context, poll: Poll) {
      console.log('store:loadChoices', poll)
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
              color: item.fields.color,
              description: item.fields.description
            }
            context.commit('addChoice', choice)
          }
          // After getting choices get also ballots
          context.commit('clearBallots')
          EventService.getBallots(poll)
            .then(response => {
              console.log(response.data)
              for (let i = 0; i < response.data.length; i++) {
                const item = response.data[i]
                console.log('loaded ballot:', item)
                const choicesString = item.fields.choices
                const choiceIdList = choicesString.split(',')
                console.log(choiceIdList)
                const choices: Choice[] = []
                for (let j = 0; j < choiceIdList.length; j++) {
                  const choiceId = choiceIdList[j]
                  for (let k = 0; k < context.state.choices.length; k++) {
                    const choice: Choice = context.state.choices[k]
                    if (choice.id === choiceId) {
                      choices.push(choice)
                      console.log(
                        'Add choice',
                        choice,
                        'to ballot',
                        item.fields.voter_name
                      )
                      break
                    }
                  }
                }
                const ballot: Ballot = {
                  voterId: item.fields.voter_name,
                  choices: choices
                }
                context.commit('addBallot', ballot)
              }
            })
            .catch((error: string) => {
              console.log(error)
            })
        })
        .catch((error: string) => {
          console.log(error)
        })
    }
  },
  modules: {}
})
