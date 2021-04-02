<template>
  <div class="home">
    <EditChoices />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EditChoices from '@/components/EditChoices.vue'

export default defineComponent({
  name: 'EditPoll',
  props: {
    pollId: {
      type: String,
      required: true
    }
  },
  components: {
    EditChoices
  }
})
</script>
