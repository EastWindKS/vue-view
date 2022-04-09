import {createApp} from 'vue'
import App from './App.vue'
import router from "./router/index.js";
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'
import {Notify} from 'quasar'
import {Quasar} from 'quasar'

createApp(App)
    .use(Quasar, {
        plugins: {Notify},
    })
    .use(router)
    .mount('#app')
