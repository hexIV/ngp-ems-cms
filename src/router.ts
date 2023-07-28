import { createWebHistory, createRouter } from "vue-router"
import Events from "@/views/Events.vue"
import Categories from "@/views/Categories.vue"
import Cities from "@/views/Cities.vue"

const routes = [
  {
    path: '/events',
    name: "Events",
    component: Events
  },
  {
    path: '/categories',
    name: "Categories",
    component: Categories
  },
  {
    path: '/cities',
    name: "Cities",
    component: Cities
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router