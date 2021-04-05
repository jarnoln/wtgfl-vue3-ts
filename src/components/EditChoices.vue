<template>
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
  <hr />
  <p>
    <input id="new-choice-text" type="text" v-model="newChoiceText" />
    <button
      id="btn-add-new-choice"
      type="button"
      class="btn btn-secondary"
      @click="addNewChoice()"
    >
      Add another choice
    </button>
  </p>
  <p>
    <button
      id="btn-clear-choices"
      type="button"
      class="btn btn-secondary"
      :disabled="choices.length === 0"
      @click="clearChoices()"
    >
      Clear choices
    </button>
    <button
      id="btn-add-example-choices"
      type="button"
      class="btn btn-secondary"
      @click="addExampleChoices()"
    >
      Use example choices
    </button>
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'EditChoices',
  created() {
    console.log('EditChoices:created()')
    if (this.choices.length === 0) {
      this.addExampleChoices()
    }
  },
  data() {
    return {
      newChoiceText: ''
    }
  },
  computed: mapState(['choices', 'pollId']),
  methods: {
    addChoice(title: string) {
      this.$store.commit('addChoice', title)
    },
    addNewChoice() {
      this.addChoice(this.newChoiceText)
      this.newChoiceText = ''
    },
    addExampleChoices() {
      this.$store.dispatch('addExampleChoices')
    },
    clearChoices() {
      this.$store.commit('clearBallots')
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
