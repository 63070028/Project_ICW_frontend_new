<template>
  <section v-if="!store.state.isLoadingData">
    <nav class="navbar is-transparent is-warning" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
        </router-link>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">

        </div>
        <div class="navbar-end">
          <!-- ของคนหางาน -->
          <router-link class="navbar-item " to="/applicantProfile" v-if="store.state.user.role == 'applicant'"><i
              class="pi pi-exclamation-circle pr-3" style="color: red"
              v-if="store.state.user.state == ''"></i>ประวัติของฉัน</router-link>
          <router-link class="navbar-item " to="/MyJobs"
            v-if="store.state.user.role == 'applicant'">งานของฉัน</router-link>

          <!-- ของบริษัท -->
          <router-link class="navbar-item " to="/companyProfile"
            v-if="store.state.user.role == 'company'">ข้อมูลบริษัท</router-link>
          <router-link class="navbar-item " to="/ListApplicant"
            v-if="store.state.user.role == 'company'">คนที่มายื่นสมัคร</router-link>

          <!-- ของแอดมิน -->
          <router-link class="navbar-item " to="/dashboard"
            v-if="store.state.user.role == 'admin'">Dashboard</router-link>

          <div class="navbar-item">
            <div class="buttons">
              <router-link class="button is-dark" to="/signup" v-if="!(store.state.user.role != '')">
                <strong>Sign Up</strong>
              </router-link>
              <router-link class="button is-light" to="/signin" v-if="!(store.state.user.role != '')">
                Sign In
              </router-link>
              <button class="button is-danger" @click="logout()" v-if="store.state.user.role != ''">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </section>
  <router-view />
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import "primeicons/primeicons.css";
import { reactive } from 'vue';
import User from './models/User';

export default defineComponent({
  setup() {
    const store = useStore();
    const user = reactive<User>(store.state.user)
    const router = useRouter();


    const logout = () => {
      localStorage.removeItem('token');
      store.commit("LOGOUT");
      router.push("/")
    }



    return {
      logout, store, user
    }
  },
})
</script>


<style>
@import 'bulma/css/bulma.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* background-color: black;; */
  /* display: flex;
  flex-direction: column; */
}
</style>
