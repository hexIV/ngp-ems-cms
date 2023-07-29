<script lang="ts">
import Table from '@/components/Table.vue'

export default {
  data() {
    return {
      columns: [
        'ID', 'Title'
      ],
      data: [],
      crudLink: 'categories/edit'
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
}
</script>

<template>
  <v-btn color="success" :to="'/' + crudLink">Add New</v-btn>
  <Table :columns="columns" :data="data" :crudLink="crudLink"></Table>
</template>