import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import Vuex from 'vuex'


import store from './stores/store'


createApp(App).use(store).mount('#app')
