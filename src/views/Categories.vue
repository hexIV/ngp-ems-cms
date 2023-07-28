<script lang="ts">
import Table from '@/components/Table.vue'
import { defineComponent } from 'vue'

export default defineComponent ({
  data() {
    return {
      columns: [
        'ID', 'Title'
      ],
      data: []
    }
  },
  methods: {
    async fetchData() {
      console.log(`${import.meta.env.VITE_API_URL}/categories`)
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
  <Table :columns="columns" :data="data"></Table>
</template>