<template>
  <div id="pollNav">
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

export default defineComponent({
  name: 'PollBar',
  props: {
    pollId: {
      type: String,
      required: true
    }
  },
  methods: {
    isActiveTab(tabName: string): boolean {
      console.log(this.$route.name)
      if (this.$route.name === tabName) {
        return true
      }
      return false
    }
  }
})
</script>
