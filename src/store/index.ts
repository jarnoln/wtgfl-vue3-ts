import { createStore } from 'vuex'
import { State } from '@/types'


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
      const id: number = state.choices.length
      const color = state.colors[id]
      state.choices.push({ id: id.toString(), title: title, color: color })
    },
    clearChoices (state: State) {
      state.choices = []
    }
  },
  actions: {},
  modules: {}
})
