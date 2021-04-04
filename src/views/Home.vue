<template>
  <div class="container"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  created() {
    console.log('Home:created()')
    this.$router.push({
      name: 'Vote',
      params: { pollId: 'wtgfl1337' }
    })
  }
})
</script>
