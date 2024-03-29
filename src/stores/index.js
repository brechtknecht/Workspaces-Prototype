import { createStore } from 'vuex'

import Vuex from 'vuex'

import WorkspaceDefaults from './defaults/workspace.config'
import Persons from './defaults/person.config'

import UserDefaults from './defaults/userDefaults.config'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      UserDefaults: {
        UserDefaults
      },
      workspace: {
        currentInt: 0,
      },
      space: {
        currentArray: []
      },
      persons: Persons,
      workspaces: WorkspaceDefaults,
      uiState : {
        isInOverview: false,
        personBarForcedOut: false,
        personBarDisabled: false,
        spaceCoordinates: Array,
        personBarActive: false
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
      state.uiState.spaceCoordinates = payload
    },
    disableSidebar(state, isDisabled) {
      state.uiState.personBarDisabled = isDisabled
    },
    hidePersonBarWithDelay(state, time) {
      if(state.uiState.personBarActive.personBarActive) { return }
      state.uiState.personBarForcedOut = true
      setTimeout(function() {
        state.uiState.personBarForcedOut = false
      }, time);
    },
    showPersonBar(state, time) {
      state.uiState.personBarForcedOut = true
      if(state.uiState.personBarActive.personBarActive) { return }
      // If the time is infinite, force the person bar to stay out
      state.uiState.personBarActive = true
      if(time == 'infinite') { return; }


      setTimeout(function() {
        state.uiState.personBarActive = true
        state.uiState.personBarForcedOut = false
      }, time);
    },
    updateWorkspace(state, payload) {
      let updatedWorkspaces = state.workspaces.map(workspace => {
      
        if(workspace.properties.id == payload.properties.id) {
          return payload
        }
        return workspace
      })
  
      state.workspaces = updatedWorkspaces
    }
  }
})

console.log(store)


export default store;