import { createStore } from 'vuex'

import Vuex from 'vuex'


const store = () => {
  return new Vuex.Store({
    state () {
      return {
        count: 0
      }
    },
    mutations: {
      increment (state) {
        state.count++
      }
    }
  });
};

export default store;

