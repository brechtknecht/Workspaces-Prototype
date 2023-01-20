import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import ProxyPage from './components/ProxyPage.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Vuex from 'vuex'

import {createRouter, createWebHistory} from 'vue-router'

import store from './stores/'

import Desktop from './views/Desktop.vue'

import { createClient } from "@liveblocks/client";



// Create a Liveblocks client
// Replace this key with your secret key provided at
// https://liveblocks.io/dashboard/projects/{projectId}/apikeys
const client = createClient({
  publicApiKey: "pk_test_eIG6RaAPNwq3pfK_7rJ9ZPW6",
});

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: Desktop },
      {
        path: '/proxy/:path',
        component: ProxyPage,
        props: true
      }
    ]
  })


createApp(App)
    .use(router)
    .use(store)
    .use(VueAxios, axios)
    .mount('#app')
