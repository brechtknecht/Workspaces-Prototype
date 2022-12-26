import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import Vuex from 'vuex'


import store from './stores/'


createApp(App).use(store).mount('#app')
