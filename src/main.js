import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import ProxyPage from './components/ProxyPage.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Vuex from 'vuex'

import {createRouter, createWebHistory} from 'vue-router'

import store from './stores/'


const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: App },
      {
        path: '/proxy/:url',
        component: ProxyPage,
        props: true
      }
    ]
  })


createApp(App).use(router).use(store).use(VueAxios, axios).mount('#app')
