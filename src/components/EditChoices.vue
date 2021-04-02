<template>
  <h1>Step 1: Edit choices</h1>
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
  <p>
    <button
      id="btn-start-voting"
      type="button"
      class="btn btn-primary"
      @click="startVoting()"
    >
      Start voting
    </button>
  </p>
  <form>
    <label for="new-poll-id">Poll ID:</label>
    <input id="new-poll-id" type="text" v-model="localPollId" />
    <p>
      This is used to invite other people to vote on the poll and must be
      unique. If voting only locally this can be ignored.
    </p>
  </form>
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
      this.$store.dispatch('addExampleChoices')
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

.btn {
  margin: 2px;
}

.choice {
  padding: 5px;
  margin: 3px;
  border: 1px solid black;
}
</style>
