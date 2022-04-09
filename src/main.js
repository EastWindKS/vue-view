import {createApp} from 'vue'
import App from './App.vue'
import router from "./router/index.js";
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'
import {LocalStorage, Notify} from 'quasar'
import {Quasar} from 'quasar'
import store from "./vuex";

createApp(App)
    .use(Quasar, {
        plugins: {Notify, LocalStorage},
    })
    .use(router)
    .use(store)
    .mount('#app')
