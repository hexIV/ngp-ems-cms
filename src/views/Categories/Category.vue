<script lang="ts">
import router from '@/router'

export default {
  data() {
    return {
      formValid: false,
      alert: false,
      id: null as number | null,
      parentId: null,
      title: '',
      categories: [] as { props: { title?: string, value: number, level?: number } }[],
      titleRules: [
        (value: string) => {
          if (value) return true

          return 'Title is required.'
        },
      ],
    }
  },
  methods: {
    async getCategory() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/categories?id=${this.$route.params.slug}`);
      const finalRes = await res.json();
      if (finalRes.status == 200) {
        this.title = finalRes.data.title
        this.id = finalRes.data.id
        this.parentId = finalRes.data.parent_id
      } else {
        this.alert = true;
      }
    },
    async save() {
      if (!this.formValid) {
        return;
      }

      let url = `${import.meta.env.VITE_API_URL}/categories` + (this.id ? `?id=${this.id}` : '');
      await fetch(`${url}`, {
        method: this.id == null ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: this.id,
          title: this.title,
          parent_id: this.parentId
        })
      }).then((response) => {
        router.push({ path: '/categories' })
      });
    },
    async getCategoriesTree() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/categories-tree`);
      const finalRes = await res.json();
      if (finalRes.status == 200) {
        // loop result to create categories array
        for (let i = 0; i < finalRes.data.length; i++) {
          if (finalRes.data[i].children.length) {
            this.getChildrenCategories(finalRes.data[i], 1);
          } else {
            this.categories.push({ props: { value: finalRes.data[i].id, title: finalRes.data[i].title, level: 1 }})
          }
        }
      }
    },
    getChildrenCategories(category: {
      id: number,
      title: string,
      children: Array<any>,
      parent_id: number | null
    }, level: number) {
      this.categories.push({
        props: {
          value: category.id,
          title: category.title,
          level: level
        }
      })
      for (let j = 0; j < category.children.length; j++) {
        if (category.children[j].children.length) {
          this.getChildrenCategories(category.children[j], level + 1);
        } else {
          this.categories.push({ props: { value: category.children[j].id, title: category.children[j].title, level: level + 1 } })
        }
      }
    },
    parentRules(value: number) {
      if (value != this.id) return true

      return 'Parent Category cannot be to itself'
    }
  },
  mounted() {
    if (this.$route.params.slug) {
      this.getCategory();
    }

    this.getCategoriesTree();
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
          <v-select label="Parent Category" :rules="[ parentRules ]" v-model="parentId" :items="categories">
            <template #item="{ props, item }">
              <v-list-item v-bind="props" :class="'pl-' + ((props.level as number) * 3)"></v-list-item>
            </template>
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-btn color="success" @click="save">Save</v-btn>
      </v-row>
    </v-container>
  </v-form>
  <v-alert v-model="alert" closable color="warning" icon="$warning" title="Something is off..." text="We couldn't load the data from our API. Please contact an administrator about this."></v-alert>
</template>