import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores/auth'
// import LoginView from '../views/LoginView.vue'
// import RegisterView from '../views/RegisterView.vue'
// import HomeView from '../views/HomeView.vue'
// import DigView from '@/views/DigView.vue'
// import WhoIsView from '@/views/WhoIsView.vue'
// import FreePingView from '../views/freeTools/FreePingView.vue'
// import FreeDigView from '../views/freeTools/FreeDigView.vue'
// import FreeTracerouteView from '../views/freeTools/FreeTracerouteView.vue'
// import FreeMtrView from '../views/freeTools/FreeMtrView.vue'
// import FreeWhoIsView from '../views/freeTools/FreeWhoIsView.vue'
// import freeDnsPropagation from '../views/freeTools/FreeDnsPropagationView.vue'
// import TraceRouteView from '@/views/TraceRouteView.vue'
// import MtrView from '@/views/MtrView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/app',
    //   name: 'home',
    //   component: HomeView,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: LoginView
    // },
    // {
    //   path: '/register',
    //   name: 'register',
    //   component: RegisterView
    // },
    // {
    //   path: '/admin/workers',
    //   name: 'admin_workers',

    //   component: () =>
    //     import(/* webpackPrefetch: true */ '../views/WorkersView.vue'),
    //   meta: {
    //     requiresAuth: true,
    //     requiresRole: 'admin'
    //   }
    // },
    // {
    //   path: '/admin/clients',
    //   name: 'admin_users',
    //   component: () =>
    //     import(/* webpackPrefetch: true */ '@/views/UsersView.vue'),
    //   meta: {
    //     requiresAuth: true,
    //     requiresRole: 'admin'
    //   }
    // },
    // {
    //   path: '/admin/providers',
    //   name: 'admin_providers',
    //   component: () =>
    //     import(/* webpackPrefetch: true */ '../views/ProvidersView.vue'),
    //   meta: {
    //     requiresAuth: true,
    //     requiresRole: 'admin'
    //   }
    // },
    // {
    //   path: '/admin/black-lists',
    //   name: 'admin_black-lists',
    //   component: () =>
    //     import(/* webpackPrefetch: true */ '../views/BlackListsView.vue'),
    //   meta: {
    //     requiresAuth: true,
    //     requiresRole: 'admin'
    //   }
    // },
    // {
    //   path: '/app/dig',
    //   name: 'app_dig',
    //   component: DigView,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    // {
    //   path: '/app/local-ping',
    //   name: 'app_local-ping',
    //   component: () =>
    //     import(/* webpackPrefetch: true */ '../views/LocalPingView.vue'),
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    // {
    //   path: '/app/ping/:domain?',
    //   name: 'app_ping',
    //   component: () =>
    //     import(/* webpackPrefetch: true */ '../views/PingView.vue'),
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    // {
    //   path: '/app/whois',
    //   name: 'app_whois',
    //   component: WhoIsView,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    // {
    //   path: '/app/dns-propagation/:type?/:site?',
    //   props: true,
    //   name: 'app_dns-propagation',
    //   meta: {
    //     requiresAuth: true
    //   },
    //   component: () =>
    //     import(/* webpackPrefetch: true */ '../views/DnsPropagationView.vue')
    // },
    // {
    //   path: '/app/traceroute',
    //   name: 'app_traceroute',
    //   component: TraceRouteView
    // },
    // {
    //   path: '/app/mtr',
    //   name: 'app_mtr',
    //   component: MtrView
    // },
    // {
    //   path: '/ping/:domain?',
    //   name: 'ping',
    //   component: () =>
    //     import(
    //       /* webpackPrefetch: true */ '../views/freeTools/FreePingView.vue'
    //     )
    // },
    // {
    //   path: '/dig',
    //   name: 'dig',
    //   component: FreeDigView
    // },
    // {
    //   path: '/traceroute',
    //   name: 'traceroute',
    //   component: FreeTracerouteView
    // },
    // {
    //   path: '/mtr',
    //   name: 'mtr',
    //   component: FreeMtrView
    // },
    // {
    //   path: '/whois',
    //   name: 'whois',
    //   component: FreeWhoIsView
    // },
    // {
    //   path: '/dns-propagation/:type?/:site?',
    //   props: true,
    //   name: 'dns-propagation',
    //   component: freeDnsPropagation
    // }
  ]
})

router.beforeEach((to, from) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  const store = useAuth()

  // redirect / (root) to /ping if user is not authenticated
  
  // if (to.path === '/' || to.path === '') {
  //   if (!store.isLoggedIn) {
  //     return {
  //       path: '/ping'
  //     }
  //   } else {
  //     return {
  //       path: '/app'
  //     }
  //   }
  // }

  // if (to.meta.requiresAuth && !store.isLoggedIn) {
  //   // this route requires auth, check if logged in
  //   // if not, redirect to login page.
  //   return {
  //     path: '/login',
  //     // save the location we were at to come back later
  //     query: { redirect: to.fullPath }
  //   }
  // }

  // if (to.meta.requiresRole && to.meta.requiresRole !== store.userRole) {
  //   return {
  //     path: from.path,
  //     query: { redirect: to.fullPath }
  //   }
  // }
})

export default router
