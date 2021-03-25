<template>
  <h1>Step 3: Results</h1>
  <div v-for="result in results" :id="result.method" :key="result.method">
    <h2>
      {{ result.method }} winner(s):
      <span v-for="winner in result.winners" :key="winner.id">{{
        winner.title
      }}</span>
    </h2>
    <h2>Points</h2>
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
  const counts: { [id: string]: ChoicePoints } = {}
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

  let winners: Choice[] = []
  const points: ChoicePoints[] = []
  let maxVotes = 0
  Object.keys(counts).forEach(key => {
    points.push(counts[key])
    const votes = counts[key].points
    const choice = counts[key].choice
    console.log('Votes for ' + key + ': ' + votes)
    if (votes > maxVotes) {
      maxVotes = votes
      winners = [choice]
      console.log(key, 'is the current winner')
    } else if (votes == maxVotes) {
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
