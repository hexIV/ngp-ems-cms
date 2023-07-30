<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  props: {
    columns: Array<any>,
    data: Array<any>,
    crudLink: String
  },
  methods: {
    deleteAction(id: number) {
      this.$emit('deleteAction', id)
    }
  }
})
</script>

<template>
  <v-table class="w-100">
    <thead>
      <tr>
        <th class="text-left" v-for="item in columns" :key="item">
          {{ item }}
        </th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.id">
        <td>#{{ item.id }}</td>
        <td>{{ item.title }}</td>
        <td><v-btn color="info" :to="'/' + crudLink + '/' + item.id">Edit</v-btn></td>
        <td><v-btn color="warning" @click="deleteAction(item.id)">Delete</v-btn></td>
      </tr>
    </tbody>
  </v-table>
</template>