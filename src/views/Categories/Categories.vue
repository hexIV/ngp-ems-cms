<script lang="ts">
import Table from '@/components/Table.vue'
import router from '@/router';
import { defineComponent } from 'vue';

export default defineComponent({
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
    },
    async deleteCategory(id: number) {
      await fetch(`${import.meta.env.VITE_API_URL}/categories?id=${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        router.push({ path: '/categories' })
      });
    }
  },
  mounted() {
    this.fetchData();
  }
})
</script>

<template>
  <v-btn color="success" :to="'/' + crudLink">Add New</v-btn>
  <Table v-on:deleteAction="deleteCategory" :columns="columns" :data="data" :crudLink="crudLink"></Table>
</template>