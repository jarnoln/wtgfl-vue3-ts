<template>
  <h1>Step 2: Vote</h1>
  <p>Poll ID: {{ pollId }}</p>
  <h2>Choices</h2>
  <div>
    <table>
      <tr
        v-for="choice in unusedChoices"
        :id="choice.id"
        :key="choice.id"
        :style="'background-color: ' + choice.color"
      >
        <td class="choice">{{ choice.title }}</td>
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
      ballot: [],
      unusedChoices: [] as Choice[]
    }
  },
  computed: mapState(['choices', 'pollId']),
  methods: {
    addChoice(title: string) {
      this.$store.commit('addChoice', title)
      // const color = this.$store.state.colors[id]
    },
    clearBallot() {
      this.ballot = []
      this.unusedChoices = this.choices
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
