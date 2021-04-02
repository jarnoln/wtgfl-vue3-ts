<template>
  <PollBar :pollId="pollId" />
  <div>
    <EditChoices />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EditChoices from '@/components/EditChoices.vue'
import PollBar from '@/components/PollBar.vue'

export default defineComponent({
  name: 'EditPoll',
  props: {
    pollId: {
      type: String,
      required: true
    }
  },
  components: {
    EditChoices,
    PollBar
  }
})
</script>
