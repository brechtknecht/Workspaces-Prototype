import { createStore } from 'vuex'

import Vuex from 'vuex'

import WorkspaceDefaults from './defaults/workspace.config'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      user: {
        name: 'Felix'
      },
      workspace: {
        currentInt: 0
      },
      workspaces: WorkspaceDefaults,
      uiState : {
        isInOverview: false
      }
    }
  },
  mutations: {
    setCurrentWorkspace (state, payload) {
      state.workspace.currentInt = payload
    },
    toggleWorkspacesOverview(state) {
      state.uiState.isInOverview = !state.uiState.isInOverview
    }
  }
})

console.log(store)


export default store;