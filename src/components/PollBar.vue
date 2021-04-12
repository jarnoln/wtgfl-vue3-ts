<template>
  <div id="pollBar">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="{ active: isActiveTab('Settings') }"
          :to="{ name: 'Settings', params: { pollId: pollId } }"
        >
          Setup
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="{ active: isActiveTab('Vote') }"
          :to="{ name: 'Vote', params: { pollId: pollId } }"
        >
          Vote
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="{ active: isActiveTab('Results') }"
          :to="{ name: 'Results', params: { pollId: pollId } }"
        >
          Results
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'PollBar',
  props: {
    pollId: {
      type: String,
      required: true
    }
  },
  created() {
    console.log('PollBar:created()')
    if (this.poll.id != this.pollId) {
      // If poll has not been set yet, do it now
      for (let i = 0; i < this.polls.length; i++) {
        if (this.polls[i].id === this.pollId) {
          this.$store.commit('setPoll', this.polls[i])
          break
        }
      }
    }
    if (this.choices.length === 0) {
      if (this.pollId == 'wtgfl1337') {
        this.$store.dispatch('addExampleChoices')
      } else {
        if (this.poll.id.length > 0) {
          this.$store.dispatch('loadChoicesAndBallots', this.poll)
        }
      }
    }
  },
  computed: mapState(['poll', 'polls', 'choices', 'ballots']),
  methods: {
    isActiveTab(tabName: string): boolean {
      // console.log(this.$route.name)
      if (this.$route.name === tabName) {
        return true
      }
      return false
    }
  }
})
</script>

<style scoped>
#pollBar {
  margin-bottom: 10px;
}
</style>
