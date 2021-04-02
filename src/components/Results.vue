<template>
  <div class="container">
    <PollBar :pollId="pollId" />
    <h1>Step 3: Results</h1>
    <div class="row">
      <div class="col-8">
        <div
          v-for="result in results"
          :id="result.method"
          :key="result.method"
          class="method-container"
        >
          <h3>Method: {{ result.method }}</h3>
          <h2>{{ getWinnersString(result) }}</h2>
          <div v-if="result.points.length > 0">
            <h3>Points</h3>
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
          <div v-if="result.method === 'schulze'">
            <h3>Pairwise result matrix</h3>
            <table>
              <thead>
                <th>&nbsp;</th>
                <th
                  v-for="choice in choices"
                  :key="choice.id"
                  :style="'background-color: ' + choice.color"
                >
                  {{ choice.id.slice(0, 2) }}
                </th>
              </thead>
              <tbody>
                <tr v-for="choiceA in choices" :key="choiceA.id">
                  <th :style="'background-color: ' + choiceA.color">
                    {{ choiceA.id.slice(0, 2) }}
                  </th>
                  <td v-for="choiceB in choices" :key="choiceB.id">
                    <span v-if="choiceA.id === choiceB.id">
                      -
                    </span>
                    <span v-else>
                      (
                      {{
                        result.pairwiseResults[choiceA.id][choiceB.id].choiceA
                          .points
                      }},
                      {{
                        result.pairwiseResults[choiceA.id][choiceB.id].choiceB
                          .points
                      }}
                      )
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-4">
        <Ballots />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import { Choice, Result } from '@/types'
import Ballots from '@/components/Ballots.vue'
import PollBar from '@/components/PollBar.vue'
import { calculateApprovalWinners } from '@/methods/approval'
import { calculatePluralityWinners } from '@/methods/plurality'
import { calculateSchulzeWinners } from '@/methods/schulze'

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
  computed: mapState(['choices', 'results', 'ballots']),
  methods: {
    calculateResults() {
      console.log('calculateResults()')
      this.$store.commit('clearResults')
      const approvalResult = calculateApprovalWinners(this.ballots)
      const pluralityResult = calculatePluralityWinners(this.ballots)
      const schulzeResult = calculateSchulzeWinners(this.choices, this.ballots)
      this.$store.commit('addResult', approvalResult)
      this.$store.commit('addResult', pluralityResult)
      this.$store.commit('addResult', schulzeResult)
    },
    getWinnersString(result: Result): string {
      let winnerString = 'No winner'
      if (result.winners.length == 0) {
        return winnerString
      }
      winnerString = 'Winner: ' + result.winners[0].title
      if (result.winners.length == 1) {
        return winnerString
      }
      // More than one winner
      winnerString = 'Winners: ' + result.winners[0].title
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

.method-container {
  padding: 5px;
  margin: 3px;
  border: 1px solid black;
}

.choice {
  padding: 5px;
  margin: 3px;
  border: 1px solid black;
}
</style>
