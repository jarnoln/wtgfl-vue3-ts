<template>
  <h1>Step 1: Create poll</h1>
  <form>
    <label for="new-poll-id">Poll ID:</label>
    <input id="new-poll-id" type="text" v-model="localPollId" />
    This is used to invite other people to vote on the poll and must be unique.
    If voting only locally this can be ignored.
  </form>
  <h2>Choices</h2>
  <div>
    <table>
      <tr
        v-for="choice in choices"
        :id="choice.id"
        :key="choice.id"
        :style="'background-color: ' + choice.color"
      >
        <td class="choice">{{ choice.title }}</td>
      </tr>
    </table>
  </div>
  <p>
    <input id="new-choice-text" type="text" v-model="newChoiceText" />
    <button id="btn-add-new-choice" @click="addNewChoice()">Add another choice</button>
  </p>
  <p>
    <button
      id="btn-clear-choices"
      :disabled="choices.length === 0"
      @click="clearChoices()"
    >
      Clear choices
    </button>
    <button id="btn-add-example-choices" @click="addExampleChoices()">
      Use example choices
    </button>
  </p>
  <p>
    <button id="btn-start-voting">
      Start voting
    </button>
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'EditChoices',
  created() {
    this.addExampleChoices()
  },
  data() {
    return {
      localPollId: 'wtgf1337',
      newChoiceText: ''
    }
  },
  computed: mapState(['choices']),
  methods: {
    addChoice(title: string) {
      this.$store.commit('addChoice', title)
      // const color = this.$store.state.colors[id]
    },
    addNewChoice() {
      this.addChoice(this.newChoiceText)
      this.newChoiceText = ''
    },
    addExampleChoices() {
      this.clearChoices()
      this.addChoice('Hamburger Hut')
      this.addChoice('Pizza Palace')
      this.addChoice('Taco Terrace')
      this.addChoice('Sushi Stall')
    },
    clearChoices() {
      this.$store.commit('clearChoices')
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
