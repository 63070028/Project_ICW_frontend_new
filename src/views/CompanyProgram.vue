<template>
  <div class="container" style="min-height: 100vh;">
    <div class="columns" style="min-height: 100vh;">
      <div class="column is-3" style="background-color: #f8f8f8; min-height: 100vh;">
        <aside class="menu">
          <p class="menu-label">Navigation</p>
          <ul class="menu-list">
            <li><router-link :class="{ 'is-active': activeTab === 'info' }" @click="setActiveTab('info')" to="/company">ข้อมูลบริษัท</router-link></li>
            <li><router-link :class="{ 'is-active': activeTab === 'jobs' }" @click="setActiveTab('jobs')" to="/companyJob">งานที่ประกาศ</router-link></li>
            <li><router-link :class="{ 'is-active': activeTab === 'programs' }" @click="setActiveTab('programs')" to="/companyProgram">โครงการพิเศษ</router-link></li>
          </ul>
        </aside>
      </div>
      <div class="column is-9" style="background-color: #f1f1f1; min-height: 100vh;">
        <div class="card" style="min-height: 100vh;">
          <div class="card-content" style="min-height: 100vh;">
            <div class="content" style="min-height: 100vh;">
              <!-- Programs tab content -->
              <div v-show="activeTab === 'programs'" style="background-color: #fafafa; min-height: 100vh;">
                <ul>
                  <li v-for="program in programs" :key="program.id">
                    <div class="card">
                      <div class="
                      card-image">
<figure class="image is-4by3">
<img :src="program.image" alt="Program Image">
</figure>
</div>
<div class="card-content">
<div class="content">
<strong>{{ program.title }}</strong>
</div>
</div>
</div>
</li>
</ul>
</div>
<!-- End of Programs tab content -->
</div>
</div>
</div>
</div>
</div>

  </div>
</template>
<style>
  html, body {
    height: 100vh;
  }
</style>
<script>
  import 'bulma/css/bulma.css';
  
  export default {
    name: 'App',
    data() {
      return {
        activeTab: 'programs',
        programs: [
          {
            id: 1,
            title: 'โครงการพิเศษ 1',
            image: 'https://via.placeholder.com/150'
          },
          {
            id: 2,
            title: 'โครงการพิเศษ 2',
            image: 'https://via.placeholder.com/150'
          },
          {
            id: 3,
            title: 'โครงการพิเศษ 3',
            image: 'https://via.placeholder.com/150'
          }
        ]
      }
    },
    methods: {
      setActiveTab(tab) {
        this.activeTab = tab;
      }
    }
  }
</script>