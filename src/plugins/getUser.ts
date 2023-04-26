import axios from "@/plugins/axios"
import {PORT} from "../port";
import store from "@/router/store";

const getUserData = async () => {
    if (store.state.user.id == "") {
        await axios.get(`${PORT}` + "/user/getData").then(res => {
          console.log(res.data.user)
          store.commit('SET_USER', res.data.user)
        }).catch(() => {
          store.commit('LOADING_DATA', false)
        })
      }
}

export default getUserData;