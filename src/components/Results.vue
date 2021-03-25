<template>
  <h1>Step 3: Results</h1>
  <div v-for="result in results" :id="result.method" :key="result.method">
    <h2>Winner:{{ results.winner.title }}</h2>
    <h2>Points</h2>
  </div>
  <Ballots />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import { Choice } from '@/types'
import Ballots from '@/components/Ballots.vue'

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
