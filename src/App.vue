<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="blue-darken-3">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-app-bar-title>NGP EMS CMS</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer>
      <v-list>
        <v-list-item :to="{path: '/events'}" prepend-icon="mdi-calendar" title="Events" value="events"></v-list-item>
        <v-list-item :to="{path: '/categories'}" prepend-icon="mdi-format-list-bulleted" title="Categories" value="categories"></v-list-item>
        <v-list-item :to="{path: '/cities'}" prepend-icon="mdi-city" title="Cities" value="cities"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="d-flex flex-column justify-center">
      <router-view />
    </v-main>
  </v-layout>
</template>