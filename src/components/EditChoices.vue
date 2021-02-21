<template>
  <h1>Choices</h1>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Choice } from '@/types'

export default defineComponent({
  name: 'EditChoices',
  created() {
    this.addExampleChoices()
  },
  data() {
    return {
      pollId: Number,
      choices: [] as Choice[],
      newChoiceText: '',
      colors: [
        '#77f',
        '#7f7',
        '#7ff',
        '#f77',
        '#f7f',
        '#ff7',
        '#aaf',
        '#afa',
        '#aff',
        '#faa',
        '#faf',
        '#ffa'
      ]
    }
  },
  methods: {
    addChoice(title: string) {
      const id: number = this.choices.length
      const color = this.colors[id]
      this.choices.push({ id: id.toString(), title: title, color: color })
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
      this.choices = []
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
