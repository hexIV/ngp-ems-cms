<script setup lang="ts">
  defineProps<{
    columns: Array<any>
    data: Array<any>
    crudLink: string
  }>()

  //TODO: show loading animation when data is empty
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
        <td><v-btn color="success" :to="'/' + crudLink + '/' + item.id">Edit</v-btn></td>
        <td><v-btn color="warning">Delete</v-btn></td>
      </tr>
    </tbody>
  </v-table>
</template>