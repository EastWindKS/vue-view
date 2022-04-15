import {createApp} from 'vue'
import App from './App.vue'
import router from "./router/index.js";
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'
import {LocalStorage, Notify, Loading} from 'quasar'
import {Quasar} from 'quasar'
import store from "./store";
import i18n from './i18n'

createApp(App)
    .use(Quasar, {
        plugins: {Notify, LocalStorage, Loading},
    })
    .use(i18n)
    .use(router)
    .use(store)
    .mount('#app')
