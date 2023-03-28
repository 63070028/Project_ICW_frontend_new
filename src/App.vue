<template>
<section>
  <nav class="navbar has-background-grey-light" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
  
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/"  >Home</router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link class="button is-primary" to="/signup">
              <strong>Sign Up</strong>
            </router-link>
            <router-link class="button is-light" to="/signin">
              Sign In
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</section>
  <router-view/>
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
