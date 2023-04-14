import { createStore } from "vuex";

const store = createStore({
  state: {
    user: {
      id: "",
      email: "",
      role: "",
      state: "",
    },
    isSignIn:false
  },
  mutations: {
    SET_USER(state, user) {
      Object.assign(state.user, user)
    },
    LOGOUT(state) {
      state.user.id = "",
      state.user.email = "",
      state.user.role = "",
      state.user.state = ""
    },
    IS_SIGNIN(state, data){
      state.isSignIn = data;
    }
  },
});

export default store;
