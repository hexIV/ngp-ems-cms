<script lang="ts">
import Table from '@/components/Table.vue'
import { defineComponent } from 'vue'

export default defineComponent ({
  data() {
    return {
      columns: [
        'ID', 'Title'
      ],
      data: [
        { id: 1, title: 'Isle of MTV' }
      ]
    }
  },
  methods: {
    async fetchData() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/events`);
      const finalRes = await res.json();
      console.log(finalRes);
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