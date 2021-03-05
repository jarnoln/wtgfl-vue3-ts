import { createStore } from 'vuex'
import { State } from '@/types'

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
      choices: []
    }
  },
  mutations: {
    addChoice (state: State, title: string) {
      const colorIndex: number = state.choices.length
      const color = state.colors[colorIndex]
      const newId: string = idFromTitle(title)
      // TODO: Check that choice with this ID does not yet exist
      console.log('addChoice id:', newId, 'title:', title, 'color:', color)
      state.choices.push({ id: newId, title: title, color: color })
    },
    clearChoices (state: State) {
      state.choices = []
    },
    setPollId (state: State, pollId: string) {
      state.pollId = pollId
    }
  },
  actions: {},
  modules: {}
})
