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
        currentInt: 0,
      },
      space: {
        currentArray: []
      },
      workspaces: WorkspaceDefaults,
      uiState : {
        isInOverview: false,
        personBarForcedOut: false,
        personBarDisabled: false,
        spaceCoordinates: Array
      }
    }
  },
  mutations: {
    setCurrentWorkspace (state, payload) {
      state.workspace.currentInt = payload
    },
    setCurrentWorkspaceArray(state, payload) {
      state.space.currentArray[payload.currentWorkspace] = payload.currentSpace
    },
    toggleWorkspacesOverview(state) {
      state.uiState.isInOverview = !state.uiState.isInOverview
    },
    initSpacePosition(state, payload) {
      state.uiState.spaceCoordinates = payload
    },
    setSpacePosition(state, payload) {
      console.log("STOREDEBUG", payload)
      state.uiState.spaceCoordinates[payload.workspacePosition] = payload.spacePosition
    },
    disableSidebar(state, isDisabled) {
      state.uiState.personBarDisabled = isDisabled
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