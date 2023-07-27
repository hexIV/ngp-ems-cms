<script setup lang="ts">
</script>

<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Title
        </th>
        <th class="text-left">
          Parent
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in categories"
        :key="item.name"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
      </tr>
    </tbody>
  </v-table>
</template>