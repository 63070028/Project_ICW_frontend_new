<template>
  <div class="company p-3">
    <div class="columns">
      <div class="column is-3" style="background-color: #f8f8f8;">
        <aside class="menu">
          <p class="menu-label">Navigation</p>
          <ul class="menu-list">
            <li><router-link :class="{ 'is-active': activeTab === 'info' }" @click="setActiveTab('info')" to="/companyProfile">ข้อมูลบริษัท</router-link></li>
            <li><router-link :class="{ 'is-active': activeTab === 'jobs' }" @click="setActiveTab('jobs')" to="/companyJob">งานที่ประกาศ</router-link></li>
            <li><router-link :class="{ 'is-active': activeTab === 'programs' }" @click="setActiveTab('programs')" to="/companyProgram" >โครงการพิเศษ</router-link ></li>
          </ul>
        </aside>
      </div>
      <div class="column is-9" style="background-color: #f1f1f1;">
        <div class="card" style="min-height: 100vh;">
          <div class="card-content">
            <div class="content">
              <div v-show="activeTab === 'info'" style="background-color: #fafafa;">
                <div class="card-content">
                  <div class="container mt-4">
                    <img :src="company.background_image" class="background_image"/>
                    <div class="columns is-gapless ml-6 mb-6" style="position: relative; top: -80px;">
                      <img :src="company.profile_image" class="column is-2 profile_image" />
                      <div class="column ml-4" style="position: relative; top: 100px;" >
                        <p class="is-size-4 has-text-weight-bold">{{ company.name }}</p>
                        <!-- Add the edit button here -->
                        <button class="button is-primary is-small" @click="editProfile">แก้ไข</button>
                      </div>
                    </div>
                    <p class="is-size-5" style="position: relative; top: -40px;">{{ company.description }}</p>
                    <div v-if="company.vdo != ''" class="vdo mt-4 mb-6" v-html="company.vdo"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Company from '@/models/Company';
export default defineComponent({
  name: 'App',
  data() {
    return {
      activeTab: 'info',
      editingProfile: false,
    };
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const company = reactive<Company>({
      id: Number(route.params.id),
      name: 'None',
      description: 'None',
      profile_image: '',
      background_image: '',
      vdo: '',
    });
    onMounted(() => {
      console.log('get api company id: ' + route.params.id);
      // set company
      const get_company:Company = {
        id: 1,
        name:
          'ไม่ทำงาน จำกัด หมาชน',
        description:
          'THiNKNET คือ บริษัท IT ที่สร้างสรรค์ผลิตภัณฑ์และบริการที่มุ่งพัฒนาคุณภาพชีวิตของคนไทยให้ดีขึ้น ก่อตั้งขึ้นในปี 2000 ผลงานโดดเด่นคือ JobThai แพลตฟอร์มหาคน หางาน สมัครงานอันดับ 1 ของประเทศ ที่ช่วยให้คนไทยมีงานทำมานานมากกว่า 20 ปี นอกจากนี้แล้ว THiNKNET ยังพัฒนาสินค้าและบริการอื่น ๆ ออกมาอยู่เสมอ เช่น Mapping & GIS Solutions, THiNKNET Design Studio',
        profile_image:
          'https://cdn.discordapp.com/attachments/905751963017285634/1089481386349580359/profile-icon-design-free-vector.png',
        background_image:
          'https://www.w3schools.com/w3images/workbench.jpg',
        vdo:
          '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
      };
      Object.assign(company, get_company);
    });
    const viewJob = (id: number) => {
      router.push('/jobs/' + id);
    };
    return {
      router,
      route,
      company,
      viewJob,
    };
  },
  methods: {
    setActiveTab(tab: string) {
      this.activeTab = tab;
    },
    editProfile() {
      // Navigate to the edit page
      this.router.push(`/companyProfile/edit/${this.company.id}`);
    },
    cancelEdit() {
      this.editingProfile = false;
    },
    saveProfile() {
      this.editingProfile = false;
    },
  },
});
</script>
<style scoped>
.background_image {
  width: 100%;
  height: 300px;
}
.profile_image {
  width: 150px;
  height: 150px;
  border: 2px solid gray;
  border-radius: 25px;
}
.vdo {
  display: flex;
  flex-direction: column;
}
.job_content:hover {
  background-color: hsl(0, 0%, 96%);
}
</style>

