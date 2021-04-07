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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EventService from '@/services/EventService'

export default defineComponent({
  name: 'Home',
  created() {
    console.log('Home:created()')
    EventService.getPolls()
      .then(response => {
        console.log(response)
      })
      .catch((error: string) => {
        console.log(error)
      })
  },
  data() {
    return {
      examplePollId: 'wtgf1337'
    }
  },
  methods: {
    createPoll() {
      this.$router.push({
        name: 'Settings',
        params: { pollId: 'wtgfl1337' }
      })
    },
    startVoting() {
      this.$router.push({
        name: 'Vote',
        params: { pollId: 'wtgfl1337' }
      })
    }
  }
})
</script>
