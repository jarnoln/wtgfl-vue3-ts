<template>
  <h1>Step 1: Edit choices</h1>
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
    <button id="btn-add-new-choice" @click="addNewChoice()">
      Add another choice
    </button>
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
    <button id="btn-start-voting" @click="startVoting()">
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
    console.log('EditChoices:created()')
    if (this.choices.length === 0) {
      this.addExampleChoices()
    }
    if (this.pollId != '') {
      this.localPollId = this.pollId
    } else {
      this.localPollId = 'wtgfl1337'
    }
  },
  data() {
    return {
      localPollId: '',
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
      this.clearChoices()
      this.addChoice('Hamburger Hut')
      this.addChoice('Pizza Palace')
      this.addChoice('Taco Terrace')
      this.addChoice('Sushi Stall')
    },
    clearChoices() {
      this.$store.commit('clearBallots')
      this.$store.commit('clearChoices')
    },
    startVoting() {
      this.$store.commit('setPollId', this.localPollId)
      this.$router.push({
        name: 'Vote',
        params: { pollId: this.localPollId }
      })
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
