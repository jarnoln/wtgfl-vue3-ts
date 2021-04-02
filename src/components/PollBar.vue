<template>
  <div id="pollNav">
    <router-link :to="{ name: 'Settings', params: { pollId: pollId } }"
      >1. Choices</router-link
    >
    |
    <router-link :to="{ name: 'Vote', params: { pollId: pollId } }"
      >2. Vote</router-link
    >
    |
    <router-link :to="{ name: 'Results', params: { pollId: pollId } }"
      >3. Results</router-link
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
