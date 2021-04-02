<template>
  <h1>Step 3: Results</h1>
  <div v-for="result in results" :id="result.method" :key="result.method">
    <h2>Method: {{ result.method }}</h2>
    <h2 v-if="result.winners.length === 1">
      Winner: {{ result.winners[0].title }}
    </h2>
    <h2 v-else>
      Winners:
      <span v-for="winner in result.winners" :key="winner.id">{{
        winner.title
      }}</span>
    </h2>
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
import { Ballot, Choice, ChoicePoints, Result } from '@/types'
import Ballots from '@/components/Ballots.vue'

function calculatePluralityWinners(ballots: Ballot[]): Result {
  console.log('calculatePluralityWinners()')
  // Go through ballots and add a point for the first choice on ballot
  // (only the first choice is counted in plurality method)
  const counts: { [id: string]: ChoicePoints } = {}  // This keeps track of vote counts fo each choice
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
      // winners.push(choices[0])
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
    points: points
  }
  return result
}

export default defineComponent({
  name: 'Results',
  props: {
    pollId: {
      type: String,
      required: true
    }
  },
  components: {
    Ballots
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
