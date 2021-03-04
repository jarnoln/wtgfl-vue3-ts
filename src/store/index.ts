import { createStore } from 'vuex'

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
    }
  },
  mutations: {},
  actions: {},
  modules: {}
})
