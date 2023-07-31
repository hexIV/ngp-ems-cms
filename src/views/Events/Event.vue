<script lang="ts">
import router from '@/router'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { format, parseISO } from 'date-fns';

export default {
  components: {
    VueDatePicker
  },
  data() {
    return {
      formValid: false,
      alert: false,
      id: null as number | null,
      title: '',
      city: null as number | null,
      starts_on: null as any,
      ends_on: null as any,
      categoriesSelected: [],
      categoriesAvailable: [],
      cities: [] as { id: number, title: string}[],
      titleRules: [
        (value: string) => {
          if (value) return true

          return 'Title is required.'
        },
      ],
    }
  },
  methods: {
    async getEvent() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/events?id=${this.$route.params.slug}`);
      const finalRes = await res.json();
      if (finalRes.status == 200) {
        this.title = finalRes.data.title
        this.id = finalRes.data.id
        this.city = finalRes.data.city_id
        this.categoriesSelected = finalRes.data.categories
        this.ends_on = parseISO(finalRes.data.ends_on)
        this.starts_on = parseISO(finalRes.data.starts_on)
      } else {
        this.alert = true;
      }
    },
    async save() {
      if (!this.formValid) {
        return;
      }

      let url = `${import.meta.env.VITE_API_URL}/events` + (this.id ? `?id=${this.id}` : '');
      await fetch(`${url}`, {
        method: this.id == null ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: this.id,
          title: this.title,
          city_id: this.city,
          starts_on: format(this.starts_on, "yyyy-MM-dd HH-mm-ss"),
          ends_on: format(this.ends_on, "yyyy-MM-dd HH-mm-ss"),
          categories: this.categoriesSelected
        })
      }).then((response) => {
        router.push({ path: '/events' })
      });
    },
    async getCities() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cities`);
      const finalRes = await res.json();
      if (finalRes.status == 200) {
        this.cities = finalRes.data
      }
    },
    async getCategories() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
      const finalRes = await res.json();
      if (finalRes.status == 200) {
        this.categoriesAvailable = finalRes.data
      }
    }
  },
  mounted() {
    if (this.$route.params.slug) {
      this.getEvent();
    }

    this.getCities();
    this.getCategories();
  }
}
</script>

<template>
  <v-form v-model="formValid">
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field v-model="title" :rules="titleRules" label="Title" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-select :items="cities" v-model="city" label="City" item-title="title" item-value="id" required></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-select :items="categoriesAvailable" v-model="categoriesSelected" label="Categories" item-title="title" item-value="id" required multiple></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-label>Starts On</v-label>
          <VueDatePicker v-model="starts_on"></VueDatePicker>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-label>Ends On</v-label>
          <VueDatePicker v-model="ends_on" :min-date="starts_on"></VueDatePicker>
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