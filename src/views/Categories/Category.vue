<script lang="ts">
export default {
  data() {
    return {
      valid: false,
      id: null,
      parentId: null,
      title: '',
      nameRules: [
        value => {
          if (value) return true

          return 'Title is required.'
        },
      ]
    }
  },
  methods: {
    async getCategory() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/categories?id=${this.$route.params.slug}`);
      const finalRes = await res.json();
      if (finalRes.status == 200) {
        console.log(finalRes)
        this.title = finalRes.data.title
        this.id = finalRes.data.id
      } else {
        // show alert an error happened
      }
    },
    async save() {
      if (!this.valid) {
        return;
      }

      let url = `${import.meta.env.VITE_API_URL}/categories`;
      const res = await fetch(`${url}`, {
        method: this.id == null ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: this.id,
          title: this.title,
          parentId: this.parentId
        })
      });
    }
  },
  created() {
    if (this.$route.params.slug) {
      this.getCategory();
    }
  }
}
</script>

<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field v-model="title" :rules="nameRules" label="Title" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-btn class="success" @click="save">Save</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>