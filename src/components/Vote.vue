<template>
  <PollBar :pollId="pollId" />
  <h1>Step 2: Vote</h1>
  <div v-if="checkForNextVoter">
    <button id="btn-next-voter" @click="nextVoter()">Next voter</button>
    <button id="btn-see-results" @click="goToResults()">See results</button>
  </div>
  <div v-else>
    <form>
      <label for="voter-id">Voter ID:</label>
      <input id="voter-id" type="text" v-model="voterId" />
    </form>
    <h2>Choices</h2>
    <div>
      <table>
        <tr
          v-for="choice in unusedChoices"
          :id="choice.id"
          :key="choice.id"
          :style="'background-color: ' + choice.color"
          @click="addToBallot(choice)"
        >
          <td class="choice">{{ choice.title }}</td>
        </tr>
      </table>
    </div>
    <h2>Your ballot</h2>
    <div>
      <table>
        <tr v-for="(choice, index) in ballot" :id="choice.id" :key="choice.id">
          <td>{{ index + 1 }}.</td>
          <td class="choice" :style="'background-color: ' + choice.color">
            {{ choice.title }}
          </td>
        </tr>
      </table>
    </div>
    <p>
      <button
        id="btn-clear-ballot"
        :disabled="ballot.length === 0"
        @click="clearBallot()"
      >
        Clear ballot
      </button>
    </p>
    <p>
      <button id="btn-cast-ballot" @click="castBallot()">
        Cast ballot
      </button>
    </p>
  </div>
  <Ballots />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import { Ballot } from '@/types'
import { Choice } from '@/types'
import Ballots from '@/components/Ballots.vue'
import PollBar from '@/components/PollBar.vue'

export default defineComponent({
  name: 'Vote',
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
    this.clearBallot()
    this.nextVoter()
  },
  data() {
    return {
      voterId: '',
      checkForNextVoter: false,
      ballot: [] as Choice[],
      unusedChoices: [] as Choice[]
    }
  },
  computed: mapState(['choices', 'ballots']),
  methods: {
    addToBallot(choice: Choice) {
      console.log('addToBallot(', choice, ')')
      if (!this.ballot.includes(choice)) {
        this.ballot.push(choice)
        // Remove this choice from unusedChoices
        const index: number = this.unusedChoices.indexOf(choice)
        this.unusedChoices.splice(index, 1)
      }
    },
    clearBallot() {
      console.log('clearBallot()')
      this.ballot = []
      this.unusedChoices = [...this.choices] // Copy of choices-array
      console.log('this.choices', this.choices)
    },
    castBallot() {
      console.log('castBallot()')
      const voterId: string = this.voterId.toString()
      const ballot: Ballot = {
        voterId: voterId,
        choices: this.ballot
      }
      this.$store.commit('addBallot', ballot)
      this.clearBallot()
      this.checkForNextVoter = true
    },
    nextVoter() {
      console.log('nextVoter()')
      const nextVoterIndex: number = this.ballots.length + 1
      this.voterId = 'voter' + nextVoterIndex.toString()
      this.checkForNextVoter = false
    },
    goToResults() {
      console.log('goToResults()')
      this.$router.push({
        name: 'Results',
        params: { pollId: this.pollId }
      })
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
