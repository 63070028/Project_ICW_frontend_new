<template>
  <preloadingVue v-if="store.state.isLoadingData"></preloadingVue>
  <div class="company p-3" v-if="!isEdited" >
    <div class="columns">
      <div class="column is-3" style="background-color: #f8f8f8;">
        <aside class="menu">
          <p class="menu-label">Navigation</p>
          <ul class="menu-list">
            <li><router-link :class="{ 'is-active': activeTab === 'info' }" @click="setActiveTab('info')"
                to="/companyProfile">ข้อมูลบริษัท</router-link></li>
            <li><router-link :class="{ 'is-active': activeTab === 'jobs' }" @click="setActiveTab('jobs')"
                to="/companyJob">งานที่ประกาศ</router-link></li>
            <li><router-link :class="{ 'is-active': activeTab === 'programs' }" @click="setActiveTab('programs')"
                to="/companyProgram">โครงการพิเศษ</router-link></li>
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
                    <img :src="company.background_image" class="background_image" />
                    <div class="columns is-gapless ml-6 mb-6" style="position: relative; top: -80px;">
                      <img :src="company.profile_image" class="column is-2 profile_image" />
                      <div class="column ml-4" style="position: relative; top: 100px;">
                        <p class="is-size-4 has-text-weight-bold">{{ company.name }}</p>
                        <!-- Add the edit button here -->
                        <button class="button is-primary is-small" @click="isEdited = true">แก้ไข</button>
                      </div>
                    </div>
                    <p class="is-size-5" style="position: relative; top: -40px;">{{ company.description }}</p>
                    <div v-if="company.video_iframe != ''" class="video_iframe mt-4 mb-6" v-html="company.video_iframe">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
  <companyProfileEdit v-if="isEdited" @updateProfileEdit="($event)=>{isEdited = $event}"></companyProfileEdit>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Company from '@/models/Company';
import { useStore } from 'vuex';
import User from '@/models/User';
import axios from '@/plugins/axios';
import { PORT } from '@/port';
import preloadingVue from '@/components/preloading.vue'
import companyProfileEdit from '@/components/company-profileEdit.vue';

export default defineComponent({
  name: 'App',
  components: {
        companyProfileEdit,
        preloadingVue,
    },
  data() {
    return {
      activeTab: 'info',
      editingProfile: false,
      isEdited: false,
    };
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const store = useStore();
    const user = reactive<User>(store.state.user)

    const company = reactive<Company>({
      id: String(route.params.id),
      name: 'None',
      description: 'None',
      profile_image: '',
      background_image: '',
      video_iframe: '',
      state: ""
    });

    onMounted(async () => {

      if (!localStorage.getItem('token')) {
        router.push('/signIn')
        return
      }
      
      store.commit('LOADING_DATA', true)

      await axios.get(`${PORT}` + "/user/getData").then(res => {
        console.log(res.data.user)
        store.commit('SET_USER', res.data.user)
      })

      await axios.get(`${PORT}` + "/company/getProfile/" + user.id).then(res => {
        console.log(res.data.company)
        Object.assign(company, res.data.company);
      })

      store.commit('LOADING_DATA', false)
      console.log('get api company id: ' + route.params.id);

    });

    const viewJob = (id: number) => {
      router.push('/jobs/' + id);
    };
    return {
      router,
      route,
      company,
      viewJob,
      user,
      store
    };
  },
  methods: {
    setActiveTab(tab: string) {
      this.activeTab = tab;
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

.video_iframe {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.job_content:hover {
  background-color: hsl(0, 0%, 96%);
}
</style>

