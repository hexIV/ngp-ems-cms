<script lang="ts">
import Table from '@/components/Table.vue'
import { defineComponent } from 'vue'

export default defineComponent ({
  data() {
    return {
      data: []
    }
  },
  methods: {
    async fetchData() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
      const finalRes = await res.json();
      if (finalRes.status == 200) {
        this.data = finalRes.data
      } else {
        // show alert an error happened
      }
    }
  },
  mounted() {
    this.fetchData();
  }
})
</script>

<template>
  Event
</template>