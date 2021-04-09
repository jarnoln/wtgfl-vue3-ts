<template>
  <form>
    <div>
      <label for="poll-title" class="form-label">Title</label>
      <input
        id="poll-title"
        type="text"
        class="form-control"
        v-model="pollTitle"
      />
    </div>
    <div>
      <label for="poll-description" class="form-label">Description</label>
      <input
        id="poll-description"
        type="text"
        class="form-control"
        v-model="pollDescription"
      />
    </div>
    <div>
      <label for="new-poll-id" class="form-label">Poll ID:</label>
      <input
        id="new-poll-id"
        type="text"
        class="form-control"
        v-model="pollId"
      />
      <div id="poll-id-help" class="form-text">
        This is used to invite other people to vote on the poll and must be
        unique. If voting only locally this can be ignored.
      </div>
    </div>
  </form>
  <p>
    <button
      id="btn-save-poll"
      type="button"
      class="btn btn-primary"
      @click="savePoll()"
    >
      Save
    </button>

    <button
      id="btn-start-voting"
      type="button"
      class="btn btn-primary"
      @click="startVoting()"
    >
      Start voting
    </button>
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import { Poll } from '@/types'
import { getSchulzeMethod } from '@/methods/schulze'
import EventService from '@/services/EventService'

export default defineComponent({
  name: 'EditPoll',
  created() {
    console.log('EditPoll:created()')
    if (this.poll.id != '') {
      this.pollId = this.poll.id
      this.pollTitle = this.poll.title
      this.pollDescription = this.poll.description
    } else {
      this.pollId = 'wtgfl1337'
      this.pollTitle = 'Where To Go For Lunch?'
      this.pollDescription = 'Example poll'
    }
  },
  data() {
    return {
      pollId: '',
      pollTitle: '',
      pollDescription: ''
    }
  },
  computed: mapState(['poll', 'choices']),
  methods: {
    savePoll() {
      const poll: Poll = {
        id: this.pollId,
        title: this.pollTitle,
        description: this.pollDescription,
        public: true,
        method: getSchulzeMethod()
      }
      this.$store.commit('setPoll', poll)
      EventService.savePoll(poll)
        .then(response => {
          console.log(response)
        })
        .catch((error: string) => {
          console.log(error)
        })
      for (let i = 0; i < this.choices.length; i++) {
        EventService.saveChoice(poll, this.choices[i])
      }
    },
    startVoting() {
      this.savePoll()
      this.$router.push({
        name: 'Vote',
        params: { pollId: this.poll.id }
      })
    }
  }
})
</script>

<style scoped>
table {
  border: 1px solid black;
}
</style>
