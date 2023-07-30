<script lang="ts">
import router from '@/router'

let controller = new AbortController();
let signal = controller.signal;

export default {
  data() {
    return {
      formValid: false,
      alert: false,
      id: null as number | null,
      title: '',
      citiesFromSearch: [] as { title: string }[],
      titleRules: [
        (value: string) => {
          if (value) return true

          return 'Title is required.'
        },
      ]
    }
  },
  methods: {
    async searchCities(event: any) {
      controller.abort();
      controller = new AbortController();
      signal = controller.signal;

      this.citiesFromSearch = []
      try {
        const res = await fetch(`${import.meta.env.VITE_CITIES_API_URL}/search?city=${event.target.value}`, { signal });
        const finalRes = await res.json();
        for (let i = 0; i <= finalRes.length; i++) {
          if (finalRes[i]) {
            this.citiesFromSearch.push({
              title: finalRes[i].display_name
            })
          }
        }
      } catch (error) {}
    },
    async getCity() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cities?id=${this.$route.params.slug}`);
      const finalRes = await res.json();
      if (finalRes.status == 200) {
        this.title = finalRes.data.title
        this.id = finalRes.data.id
      } else {
        this.alert = true;
      }
    },
    async save() {
      if (!this.formValid) {
        return;
      }

      let url = `${import.meta.env.VITE_API_URL}/cities` + (this.id ? `?id=${this.id}` : '');
      await fetch(`${url}`, {
        method: this.id == null ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: this.id,
          title: this.title
        })
      }).then((response) => {
        router.push({ path: '/cities' })
      });
    }
  },
  mounted() {
    if (this.$route.params.slug) {
      this.getCity();
    }
  }
}
</script>

<template>
  <v-form v-model="formValid">
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <v-autocomplete v-model="title" :items="citiesFromSearch" :rules="titleRules" @keyup="searchCities" label="Title" required></v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-btn color="success" @click="save">Save</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  <v-alert v-model="alert" closable color="warning" icon="$warning" title="Something is off..." text="We couldn't load the data from our API. Please contact an administrator about this."></v-alert>
</template>