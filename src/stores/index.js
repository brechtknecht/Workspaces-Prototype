import { createStore } from 'vuex'

import Vuex from 'vuex'

import WorkspaceDefaults from './defaults/workspace.config'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      workspace: {
        currentInt: 0
      },
      workspaces: WorkspaceDefaults
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

console.log(store)


export default store;