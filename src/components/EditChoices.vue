<template>
  <h1>Create poll</h1>
  <p>Poll ID: {{ $store.state.pollId }}</p>
  <h2>Add choices</h2>
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
    <button id="btn-add-new-choice" @click="addNewChoice()">Add choice</button>
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
      newChoiceText: ''
    }
  },
  computed: mapState(['pollId', 'choices']),
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
      this.addChoice('Sushi Site')
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
