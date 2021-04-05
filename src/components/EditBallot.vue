<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-sm-6">
        <h2>Your ballot</h2>
        <table>
          <tr
            v-for="(choice, index) in ballot"
            :id="choice.id"
            :key="choice.id"
          >
            <td>{{ index + 1 }}.</td>
            <td class="choice" :style="'background-color: ' + choice.color">
              {{ choice.title }}
            </td>
          </tr>
        </table>
      </div>
      <div class="col-12 col-sm-6">
        <h2>Choices</h2>
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
    </div>
    <p>
      <button
        id="btn-clear-ballot"
        type="button"
        class="btn btn-secondary"
        :disabled="ballot.length === 0"
        @click="clearBallot()"
      >
        Clear ballot
      </button>
    </p>
    <p>
      <button
        id="btn-cast-ballot"
        type="button"
        class="btn btn-primary"
        :disabled="ballot.length === 0"
        @click="castBallot()"
      >
        Cast ballot
      </button>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import { Ballot } from '@/types'
import { Choice } from '@/types'

export default defineComponent({
  name: 'EditBallot',
  props: {
    pollId: {
      type: String,
      required: true
    },
    voterId: {
      type: String,
      required: true
    }
  },
  emits: {
    ballotWasCast: null
  },
  created() {
    this.clearBallot()
  },
  data() {
    return {
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
      this.$emit('ballotWasCast')
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
