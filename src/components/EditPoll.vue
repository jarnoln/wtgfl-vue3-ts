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
        v-model="localPollId"
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
      :disabled="isSaved"
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
  <p>Saved: {{ isSaved }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import { Poll } from '@/types'
import { getSchulzeMethod } from '@/methods/schulze'
import EventService from '@/services/EventService'

export default defineComponent({
  name: 'EditPoll',
  props: {
    pollId: {
      type: String,
      required: true
    }
  },
  created() {
    console.log('EditPoll:created()')
    this.localPollId = this.pollId
    if (this.poll.id != '') {
      // Poll already exists, initialize with current values.
      this.localPollId = this.poll.id
      this.pollTitle = this.poll.title
      this.pollDescription = this.poll.description
    }
  },
  data() {
    return {
      localPollId: '',
      pollTitle: '',
      pollDescription: '',
      saveInProgress: false
    }
  },
  computed: {
    ...mapState(['poll', 'choices']),
    isSaved: function(): boolean {
      return (
        this.localPollId === this.poll.id &&
        this.pollTitle === this.poll.title &&
        this.pollDescription === this.poll.description &&
        this.poll.saved
      )
    }
  },
  methods: {
    savePoll() {
      this.saveInProgress = true
      const poll: Poll = {
        id: this.localPollId,
        title: this.pollTitle,
        description: this.pollDescription,
        public: true,
        saved: false,
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
      if (this.localPollId != this.pollId) {
        console.log('Poll ID changed from', this.pollId, 'to', this.localPollId)
        // Update router
        this.$router.push({
          name: 'Settings',
          params: { pollId: this.localPollId }
        })
      }
      this.$store.commit('setPollSaved', true)
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
