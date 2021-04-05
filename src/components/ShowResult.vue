<template>
  <h2>{{ getWinnersString(result) }}</h2>
  <div>Method: {{ result.method.title }}</div>
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
  <div v-if="result.method.id === 'schulze'">
    <h3>Pairwise results</h3>
    <div v-for="(choiceA, indexA) in choices" :key="choiceA.id">
      <div v-for="(choiceB, indexB) in choices" :key="choiceB.id">
        <span v-if="indexB > indexA">
          {{ getPairwiseResultString(result, choiceA, choiceB) }}
        </span>
      </div>
    </div>
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
            {{ getMatrixCellString(result, choiceA, choiceB) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { mapState } from 'vuex'
import { Choice, Result } from '@/types'

export default defineComponent({
  name: 'ShowResult',
  props: {
    result: {
      type: Object as PropType<Result>,
      required: true
    }
  },
  computed: mapState(['choices']),
  methods: {
    getMatrixCellString(
      result: Result,
      choiceA: Choice,
      choiceB: Choice
    ): string {
      if (choiceA.id === choiceB.id) {
        return '-'
      }
      let str = '('
      str += result.pairwiseResults[choiceA.id][
        choiceB.id
      ].choiceA.points.toString()
      str += ','
      str += result.pairwiseResults[choiceA.id][
        choiceB.id
      ].choiceB.points.toString()
      str += ')'
      return str
    },
    getPairwiseResultString(
      result: Result,
      choiceA: Choice,
      choiceB: Choice
    ): string {
      if (choiceA.id === choiceB.id) {
        return ''
      }
      let str = choiceA.title + ' vs. ' + choiceB.title + ': '
      const scoreA =
        result.pairwiseResults[choiceA.id][choiceB.id].choiceA.points
      const scoreB =
        result.pairwiseResults[choiceA.id][choiceB.id].choiceB.points
      str += scoreA.toString() + ' - ' + scoreB.toString()
      if (scoreA > scoreB) {
        str += ' Winner: ' + choiceA.title
      } else if (scoreB > scoreA) {
        str += ' Winner: ' + choiceB.title
      } else {
        str += ' Tie'
      }
      return str
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
</style>
