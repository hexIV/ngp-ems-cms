<script lang="ts">
import Table from '@/components/Table.vue'
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      columns: [
        'ID', 'Title', 'City', 'Categories'
      ],
      data: [],
      crudLink: 'events/edit'
    }
  },
  methods: {
    async fetchData() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/events`);
      const finalRes = await res.json();
      if (finalRes.status == 200) {
        this.data = finalRes.data
      } else {
        // show alert an error happened
      }
    },
    async deleteEvent(id: number) {
      await fetch(`${import.meta.env.VITE_API_URL}/events?id=${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status == 200) {
          this.fetchData()
        }        
      });
    }
  },
  mounted() {
    this.fetchData();
  }
})
</script>

<template>
  <div class="d-flex justify-space-between align-center pa-5">
    <h1>Events</h1>
    <v-btn color="success" :to="'/' + crudLink">Add New</v-btn>
  </div>
  <Table v-on:deleteAction="deleteEvent" :columns="columns" :data="data" :crudLink="crudLink"></Table>
</template>