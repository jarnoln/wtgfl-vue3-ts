<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="text-center">Where To Go For Lunch?</h1>
        <p>
          Create polls where users can state their preferences of available
          lunch options and get a result which of them is the optimal(*) choice
          for the whole group. Possible to use also for other group decisions.
        </p>
        <p>
          Probably the best way to figure things out is to
          <router-link
            :to="{ name: 'Vote', params: { pollId: examplePollId } }"
          >
            try voting
          </router-link>
          in an example poll or just
          <router-link
            :to="{ name: 'Settings', params: { pollId: examplePollId } }"
          >
            create your own poll.
          </router-link>
        </p>
        <p>
          <small>
            * If there are two or more choices
            <a
              href="https://en.wikipedia.org/wiki/Arrow%27s_impossibility_theorem"
            >
              there is no completely problem-free method
            </a>
            to figure out the best one for the whole group. Nevertheless, some
            methods have less problems than others and this is using one of the
            best currently known methods. If not happy with that it is also
            possible to use some other methods.
          </small>
        </p>
        <div class="text-center">
          <button
            id="example-vote-button"
            type="button"
            class="btn btn-primary"
            @click="startVoting()"
          >
            Try voting
          </button>
          <button
            id="create-poll-button"
            type="button"
            class="btn btn-primary"
            @click="createPoll()"
          >
            Create poll
          </button>
        </div>
        <table class="table" v-if="polls.length > 0">
          <thead>
            <tr>
              <th colspan="4">Public polls</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="poll in polls" :key="poll.id">
              <td>{{ poll.title }}</td>
              <td>
                <button
                  class="btn btn-warning btn-sm"
                  type="button"
                  @click="editPoll(poll.id)"
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  class="btn btn-success btn-sm"
                  type="button"
                  @click="voteInPoll(poll.id)"
                >
                  Vote
                </button>
              </td>
              <td>
                <button
                  class="btn btn-danger btn-sm"
                  type="button"
                  @click="deletePoll(poll.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'

function generateRandomId(length: number): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let randomId = ''
  for (let i = 0; i < length; i++) {
    randomId += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return randomId
}

export default defineComponent({
  name: 'Home',
  created() {
    console.log('Home:created()')
    this.$store.dispatch('loadPolls')
  },
  data() {
    return {
      examplePollId: 'wtgf1337'
    }
  },
  computed: mapState(['polls']),
  methods: {
    createPoll() {
      this.$router.push({
        name: 'Settings',
        params: { pollId: generateRandomId(16) }
      })
    },
    voteInPoll(pollId: string) {
      this.$router.push({
        name: 'Vote',
        params: { pollId: pollId }
      })
    },
    editPoll(pollId: string) {
      this.$router.push({
        name: 'Settings',
        params: { pollId: pollId }
      })
    },
    deletePoll(pollId: string) {
      this.$store.dispatch('deletePoll', pollId)
    },
    startVoting() {
      this.voteInPoll(this.examplePollId)
    }
  }
})
</script>
