import { createStore } from "vuex";

const store = createStore({
  state: {
    user: {
      id: "",
      email: "",
      role: "",
      state: "",
    },
    isLoadingData:true
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
    LOADING_DATA(state, data){
      state.isLoadingData = data;
    }
  },
});

export default store;
