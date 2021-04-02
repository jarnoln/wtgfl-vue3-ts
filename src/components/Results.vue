<template>
  <PollBar :pollId="pollId" />
  <h1>Step 3: Results</h1>
  <div v-for="result in results" :id="result.method" :key="result.method">
    <h2>Method: {{ result.method }}</h2>
    <h2>{{ getWinnersString(result) }}</h2>
    <h2>Points</h2>
    <table>
      <thead>
        <th>Choice</th>
        <th>Votes</th>
      </thead>
      <tr
        v-for="choicePoints in result.points"
        :key="choicePoints.choice.id"
        :id="choicePoints.choice.id"
      >
        <td>{{ choicePoints.choice.title }}</td>
        <td>{{ choicePoints.points }}</td>
      </tr>
    </table>
  </div>
  <Ballots />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import { Choice, Result } from '@/types'
import Ballots from '@/components/Ballots.vue'
import PollBar from '@/components/PollBar.vue'
import { calculatePluralityWinners } from '@/methods/plurality'

export default defineComponent({
  name: 'Results',
  props: {
    pollId: {
      type: String,
      required: true
    }
  },
  components: {
    Ballots,
    PollBar
  },
  created() {
    this.calculateResults()
  },
  data() {
    return {
      voterId: '',
      checkForNextVoter: false,
      ballot: [] as Choice[],
      unusedChoices: [] as Choice[]
    }
  },
  computed: mapState(['results', 'ballots']),
  methods: {
    calculateResults() {
      console.log('calculateResults()')
      this.$store.commit('clearResults')
      const result = calculatePluralityWinners(this.ballots)
      this.$store.commit('addResult', result)
    },
    getWinnersString(result: Result): string {
      let winnerString = 'No winner'

      if (result.winners.length == 0) {
        return winnerString
      }
      winnerString = 'Winners: ' + result.winners[0].title
      if (result.winners.length == 1) {
        return winnerString
      }
      for (let i = 1; i < result.winners.length; i++) {
        winnerString += ', ' + result.winners[i].title
      }
      return winnerString
    }
  }
})
</script>

<style scoped>
table {
  border: 1px solid black;
}

.choice {
  padding: 5px;
  margin: 3px;
  border: 1px solid black;
}
</style>
