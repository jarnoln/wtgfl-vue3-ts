<template>
  <h1>Step 2: Vote</h1>
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
    <button id="btn-cast-ballot">
      Cast ballot
    </button>
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import { Choice } from '@/types'

export default defineComponent({
  name: 'Vote',
  props: {
    pollId: {
      type: String,
      required: true
    }
  },
  created() {
    this.clearBallot()
  },
  data() {
    return {
      voterId: '',
      ballot: [] as Choice[],
      unusedChoices: [] as Choice[]
    }
  },
  computed: mapState(['choices']),
  methods: {
    addToBallot(choice: Choice) {
      console.log('addChoiceToBallot', choice)
      if (!this.ballot.includes(choice)) {
        this.ballot.push(choice)
        // Remove this choice from unusedChoices
        const index: number = this.unusedChoices.indexOf(choice)
        this.unusedChoices.splice(index, 1)
      }
      // this.$store.commit('addChoiceToBallot', choiceId)
      // const color = this.$store.state.colors[id]
    },
    clearBallot() {
      this.ballot = []
      this.unusedChoices = [...this.choices] // Copy of choices-array
      console.log('this.choices', this.choices)
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
