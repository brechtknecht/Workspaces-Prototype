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
    hidePersonBarWithDelay(state, time) {
      setTimeout(function() {
        state.uiState.personBarForcedOut = false
      }, time);
    },
    showPersonBar(state, time) {
      state.uiState.personBarForcedOut = true
      // If the time is infinite, force the person bar to stay out
      if(time == 'infinite') { return; }

      setTimeout(function() {
        state.uiState.personBarForcedOut = false
      }, time);
    }
  }
})

console.log(store)


export default store;