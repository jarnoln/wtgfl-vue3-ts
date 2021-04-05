<template>
  <div class="container">
    <PollBar :pollId="pollId" />
    <h1>Results</h1>
    <ul class="nav nav-tabs">
      <li v-for="method in methods" :key="method.id" class="nav-item">
        <a
          class="nav-link"
          :class="{ active: method.id === selectedMethod.id }"
          href="#"
          @click="selectMethod(method)"
        >
          {{ method.title }}
        </a>
      </li>
    </ul>
    <div class="row">
      <div class="col-8">
        <div
          v-for="result in results"
          :id="result.method"
          :key="result.method"
          class="method-container"
        >
          <ShowResult :result="result" />
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
import { Method } from '@/types'
import Ballots from '@/components/Ballots.vue'
import PollBar from '@/components/PollBar.vue'
import ShowResult from '@/components/ShowResult.vue'
import { calculateApprovalWinners } from '@/methods/approval'
import { calculatePluralityWinners } from '@/methods/plurality'
import { calculateSchulzeWinners, getSchulzeMethod } from '@/methods/schulze'

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
    PollBar,
    ShowResult
  },
  created() {
    if (this.methods.length === 0) {
      this.$store.dispatch('addMethods')
    }
    this.calculateResults()
    this.selectedMethod = this.poll.method
  },
  data() {
    return {
      selectedMethod: getSchulzeMethod()
    }
  },
  computed: mapState(['choices', 'methods', 'poll', 'results', 'ballots']),
  methods: {
    calculateResults() {
      console.log('calculateResults()')
      this.$store.commit('clearResults')
      if (this.selectedMethod.id === 'approval') {
        const approvalResult = calculateApprovalWinners(this.ballots)
        this.$store.commit('addResult', approvalResult)
      } else if (this.selectedMethod.id === 'plurality') {
        const pluralityResult = calculatePluralityWinners(this.ballots)
        this.$store.commit('addResult', pluralityResult)
      } else if (this.selectedMethod.id === 'schulze') {
        const schulzeResult = calculateSchulzeWinners(
          this.choices,
          this.ballots
        )
        this.$store.commit('addResult', schulzeResult)
      }
    },
    selectMethod(method: Method) {
      console.log('selectMethod:', method)
      this.selectedMethod = method
      this.calculateResults()
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
</style>
