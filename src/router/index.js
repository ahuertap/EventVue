import Vue from 'vue'
import VueRouter from 'vue-router'
import EventCreate from '@/views/EventCreate'
import EventList from '@/views/EventList'
import EventShow from '@/views/EventShow'
import NProgress from 'nprogress'
import store from '@/store/index'
import NotFound from '@/views/NotFound'
import NetworkIssue from '@/views/NetworkIssue'
import ValidationForm from '@/views/ExampleValidationForm'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList,
    props: true
  },
  {
    path: '/event/show/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
    beforeEnter(to, from, next) {
      store
        .dispatch('event/fetchEvent', to.params.id)
        .then(event => {
          to.params.event = event
          next()
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            next({ name: '404', params: { resource: 'event' } })
          } else {
            next({ name: 'network-issue' })
          }
        })
    }
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue
  },
  {
    // Toda ruta que no exista se redireccionara al componente 404
    path: '*',
    redirect: { name: '404', params: { resource: 'page' } }
  },
  {
    path: '/exampleValidationForm',
    name: 'validation-form',
    component: ValidationForm
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
