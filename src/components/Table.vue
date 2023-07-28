<script setup lang="ts">
  defineProps<{
    columns: Array<any>
    data: Array<any>
  }>()
</script>

<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left" v-for="item in columns">
          {{ item }}
        </th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in data"
        :key="item.id"
      >
        <td>#{{ item.id }}</td>
        <td>{{ item.title }}</td>
        <td><v-btn color="success">Edit</v-btn></td>
        <td><v-btn color="warning">Delete</v-btn></td>
      </tr>
    </tbody>
  </v-table>
</template>