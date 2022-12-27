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
        isInOverview: false,
        personBarForcedOut: false
      }
    }
  },
  mutations: {
    setCurrentWorkspace (state, payload) {
      state.workspace.currentInt = payload
    },
    toggleWorkspacesOverview(state) {
      state.uiState.isInOverview = !state.uiState.isInOverview
    },
    togglePersonBarForcedOut(state, payload) {
      if(!payload) {
        setTimeout(function() {
          state.uiState.personBarForcedOut = false
      }, 2000);
      } else {
        state.uiState.personBarForcedOut = true
      }
    }
  }
})

console.log(store)


export default store;