<template>
  <div class="container">
    <PollBar :pollId="pollId" />
    <h1>Setup</h1>
    <div class="row">
      <div class="col-12 col-sm-6">
        <EditPoll />
      </div>
      <div class="col-12 col-sm-6">
        <EditChoices />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EditChoices from '@/components/EditChoices.vue'
import EditPoll from '@/components/EditPoll.vue'
import PollBar from '@/components/PollBar.vue'

export default defineComponent({
  name: 'Settings',
  props: {
    pollId: {
      type: String,
      required: true
    }
  },
  components: {
    EditChoices,
    EditPoll,
    PollBar
  }
})
</script>
