<template>
    <aside class="menu">
      <p class="menu-label">Navigation</p>
         <p :class="{'button is-active ': activeTab === 'about'}" @click="setActiveTab('info')"><router-link to="/company">ข้อมูลบริษัท</router-link></p>
        <p :class="{'button is-active': activeTab === 'products'}" @click="setActiveTab('jobs')"><router-link to="/companyJob">งานที่ประกาศ</router-link></p>
        <p :class="{'button is-active': activeTab === 'services'}" @click="setActiveTab('programs')"><router-link to="/companyProgram">โครงการพิเศษ</router-link></p>      
    </aside>
  </template>
  
  <script>
  export default {
    name: 'Side-bar',
    props: {
      activeTab: String,
    },
    methods: {
      setActiveTab(tab) {
        this.$emit('tab-changed', tab);
      },
    },
  };
  </script>
  