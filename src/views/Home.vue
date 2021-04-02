<template>
  <div class="container">
    <EditChoices />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EditChoices from '@/components/EditChoices.vue'

export default defineComponent({
  name: 'Home',
  components: {
    EditChoices
  }
})
</script>
