import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import * as Sentry from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'

import '@/assets/base.css'

loadFonts()

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

const sentryEnv = import.meta.env.VITE_SENTRY_ENVIRONMENT
if (sentryEnv === 'production' || sentryEnv === 'staging') {
  Sentry.init({
    app,
    dsn: 'https://10c05f925a66425fbec32c5edd320a06@o1178265.ingest.sentry.io/6342238',
    integrations: [
      // new BrowserTracing({
      //   routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      //   tracingOrigins: ['localhost', 'dev.admintools.io', /^\//]
      // })
    ],
    environment: sentryEnv,
    logErrors: true,
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 0
  })
}

app.use(pinia)
app.use(router)
app.use(vuetify)
router.isReady().then(() => {
  app.mount('#app')
})
