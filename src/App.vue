<template>
  <section>
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
          <router-link class="navbar-item " to="/applicantProfile">ประวัติของฉัน</router-link>
          <router-link class="navbar-item " to="/MyJobs">งานของฉัน</router-link>

           <!-- ของบริษัท -->
           <router-link class="navbar-item " to="/companyProfile">ข้อมูลบริษัท</router-link>
           <router-link class="navbar-item " to="/ListApplicant">คนที่มายื่นสมัคร</router-link>

           <!-- ของแอดมิน -->
           <router-link class="navbar-item " to="/dashboard">Dashboard</router-link>

          <div class="navbar-item">
            <div class="buttons">
              <router-link class="button is-dark" to="/signup">
                <strong>Sign Up</strong>
              </router-link>
              <router-link class="button is-light" to="/signin">
                Sign In
              </router-link>
              <button class="button is-danger">
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

<style>
@import 'bulma/css/bulma.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* background-color: black;; */
  /* display: flex;
  flex-direction: column; */
}
</style>
