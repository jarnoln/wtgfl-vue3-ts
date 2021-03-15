<template>
  <h2>Ballots</h2>
  <div>
    <table>
      <tr
        v-for="ballot in ballots"
        :id="'ballot_' + ballot.voterId"
        :key="ballot.voterId"
      >
        <td>{{ ballot.voterId }}</td>
        <td
          v-for="choice in ballot.choices"
          :id="'ballot_' + ballot.voterId + '_choice_' + choice.id"
          :key="choice.id"
          :style="'background-color: ' + choice.color"
        >
          {{ choice.id.slice(0, 2) }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'Ballots',
  computed: mapState(['ballots'])
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
