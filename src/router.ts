import { createWebHistory, createRouter } from "vue-router"
import Events from "@/views/Events/Events.vue"
import Event from "@/views/Events/Event.vue"
import Categories from "@/views/Categories/Categories.vue"
import Category from "@/views/Categories/Category.vue"
import Cities from "@/views/Cities/Cities.vue"
import City from "@/views/Cities/City.vue"

const routes = [
  {
    path: '/events',
    name: "Events",
    component: Events
  },
  {
    path: '/events/edit',
    name: "CreateEvent",
    component: Event
  },
  {
    path: '/events/edit/:slug',
    name: "EditEvent",
    component: Event
  },
  {
    path: '/categories',
    name: "Categories",
    component: Categories,
  },
  {
    path: '/categories/edit',
    name: "CreateCategory",
    component: Category
  },
  {
    path: '/categories/edit/:slug',
    name: "EditCategory",
    component: Category
  },
  {
    path: '/cities',
    name: "Cities",
    component: Cities
  },
  {
    path: '/cities/edit',
    name: "CreateCity",
    component: City
  },
  {
    path: '/cities/edit/:slug',
    name: "EditCity",
    component: City
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router