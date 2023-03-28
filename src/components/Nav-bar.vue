<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
        </a>
        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" @click="toggleMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" :class="{ 'is-active': showMenu }">
        <div class="navbar-start">
          <a class="navbar-item" :class="{ 'is-active': activeTab === 'home' }" @click="setActiveTab('home')">Home</a>
          <a class="navbar-item" :class="{ 'is-active': activeTab === 'about' }" @click="setActiveTab('about')">About Us</a>
          <a class="navbar-item" :class="{ 'is-active': activeTab === 'products' }" @click="setActiveTab('products')">Products</a>
          <a class="navbar-item" :class="{ 'is-active': activeTab === 'services' }" @click="setActiveTab('services')">Services</a>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Nav-bar',
    props: {
      activeTab: String,
    },
    data() {
      return {
        showMenu: false,
      };
    },
    methods: {
      toggleMenu() {
        this.showMenu = !this.showMenu;
      },
      setActiveTab(tab) {
        this.$emit('tab-changed', tab);
      },
    },
  };
  </script>
  