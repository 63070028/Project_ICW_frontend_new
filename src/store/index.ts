import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    }
  },
  actions: {
     setUser({ commit }, data) {
        const user = data
        commit('SET_USER', user)
    }
  },
  getters: {
    user(state) {
      return state.user
    }
  }
})
