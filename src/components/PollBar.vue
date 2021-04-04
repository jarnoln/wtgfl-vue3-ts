<template>
  <div id="pollNav">
    <router-link :to="{ name: 'Settings', params: { pollId: pollId } }"
      >Setup</router-link
    >
    |
    <router-link :to="{ name: 'Vote', params: { pollId: pollId } }"
      >Vote</router-link
    >
    |
    <router-link :to="{ name: 'Results', params: { pollId: pollId } }"
      >Results</router-link
    >
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
  }
})
</script>
