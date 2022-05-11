import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


import '@/assets/base.css'

loadFonts()

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)



app.use(pinia)
app.use(router)
app.use(vuetify)
router.isReady().then(() => {
  app.mount('#app')
})
