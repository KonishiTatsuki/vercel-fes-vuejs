import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
// import VueCookie from 'vue-cookie';
import VueCookies from 'vue-cookies'



createApp(App).use(store).use(router).use(VueCookies).mount('#app')
