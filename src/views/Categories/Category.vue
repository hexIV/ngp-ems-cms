<script lang="ts">
  export default {
    data() {
      return {
        formValid: false,
        alert: false,
        id: null,
        parentId: null,
        title: '',
        categories: [],
        /*
        [
          { props: { header: 'Fruits' } },
          {
            title: 'Pineapple',
          },
          {
            title: 'Apple',
          },
          { props: { divider: true } },
          { props: { header: 'Vegetables' } },
          {
            title: 'Lettuce',
          },
          {
            title: 'Broccoli',
          },
        ]
        */
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

        let url = `${import.meta.env.VITE_API_URL}/categories` + (this.id ? `?id=${this.id}` : '');
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
      },
      async getCategoriesTree() {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/categories-tree`);
        const finalRes = await res.json();
        if (finalRes.status == 200) {
          console.log(finalRes.data);
          // loop result to create categories array
          for (let i = 0; i < finalRes.data.length; i++) {
            if (finalRes.data[i].children.length) {
              this.getChildrenCategories(finalRes.data[i], 1);
            } else {
              this.categories.push({ props: { title: finalRes.data[i].title, level: 1 }})
            }
            this.categories.push({ props: { divider: true } })
          }
        }
        console.log(this.categories)
      },
      getChildrenCategories(category: {
        title: string,
        children: Array<any>,
        parent_id: number | null
      }, level: number) {
        this.categories.push({
          props: {
            header: category.title,
            level: level
          }
        })
        for (let j = 0; j < category.children.length; j++) {
          if (category.children[j].children.length) {
            this.getChildrenCategories(category.children[j], level + 1);
          } else {
            this.categories.push({ props: { title: category.children[j].title, level: level + 1 } })
          }
        }
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
          <v-text-field v-model="title" :rules="nameRules" label="Title" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-select label="Parent Category" :items="categories">
            <template #item="{ props, item }">
              <v-list-item v-bind="props" v-if="props.header" :class="'pl-' + (props.level * 3)">
                {{ props.header }}
              </v-list-item>
              <v-divider v-else-if="props.divider" />
              <v-list-item v-else v-bind="props" :class="'pl-' + (props.level * 3)"></v-list-item>
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