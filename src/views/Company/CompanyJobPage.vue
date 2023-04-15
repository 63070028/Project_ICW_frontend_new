<template>
  <div class="company p-3" v-if="!isAddingjob">
    <div class="columns">
      <div class="column is-3" style="background-color: #f8f8f8">
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
      <div class="card-container column is-9">
        <div class="card" style="min-height: 100vh ">
          <div class="card-content">
            <div class="content">
              <div v-show="activeTab === 'jobs'">
                <div class="head-content">

                  <button class="button is-success" @click="isAddingjob = true">เพิ่มประกาศงาน</button>

                  <h1 class="title">งานที่ประกาศ</h1>
                </div>
                <div class="job-card" v-for="(job, index) in jobs" :key="index">
                  <div class="job-detail">
                    <p class="is-size-4 has-text-weight-bold">{{ index + 2 + "." }} {{ job.name }}</p>
                    <p class="job-detai-text">สถานที่ทำงาน: {{ job.location }}</p>
                    <p class="job-detai-text">ค่าตอบแทนรายวัน: {{ job.salary_per_day }}</p>
                    <p class="job-detai-text">รูปแบบการสัมภาษณ์: {{ job.interview }}</p>
                    <p class="job-detai-text">จำนวนที่รับ: {{ job.capacity }}</p>
                    <div class="column is-6 edit" style="background-color: #your_color_code;">
                      <div class="field" style="background-color: #your_color_code;">
                        <v-switch v-model="job.state" hide-details inset color="success" :true-value="JobStatus.Open"
                          :false-value="JobStatus.Closed" :label="`สถานะงาน: ${job.state}`"
                          :style="{ color: jobStateColor(job.state) }">
                        </v-switch>
                        <router-link :to="'/companyEditJob/' + job.id">
                          <button class="button is-small is-info">แก้ไขงาน</button>
                        </router-link>
                        <button class="button is-small is-danger" @click="deleteForm">ลบงาน</button>
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
  </div>
  <CompanyAddjob v-if="isAddingjob"></CompanyAddjob>
</template>
<script lang="ts">

import "bulma/css/bulma.css";
import { defineComponent, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import Company from "@/models/Company";
import Swal from "sweetalert2";
import { JobStatus } from "@/models/Job2";
import preloadingVue from '@/components/preloading.vue'
import CompanyAddjob from "@/components/company-addjob.vue";
import axios from '@/plugins/axios';
import { PORT } from '@/port';
import { useStore } from "vuex";
import User from "@/models/User";
import Job from "@/models/Job";

export default defineComponent({
  components: {
    CompanyAddjob,
    // preloadingVue,
  },
  data: () => ({
    model: "no",
    isAddingjob: false,
  }),

  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const user = reactive<User>(store.state.user)

    const company = reactive<Company>({
      id: "",
      name: "",
      description: "",
      profile_image: "",
      background_image: "",
      video_iframe: "",
      state: ""
    });
    const jobs = reactive<Job[]>([]);


    onMounted(async () => {

      await axios.get(`${PORT}` + "/user/getData").then(res => {
        console.log(res.data.user)
        store.commit('SET_USER', res.data.user)
      })

      await axios.get(`${PORT}` + "/company/getJob/" + user.id).then(res => {
        Object.assign(jobs, res.data.items)
      })


      console.log("get api company id: " + route.params.id);


    });
    const viewJob = (id: number) => {
      router.push("/jobs/" + id);
    };
    const deleteForm = async () => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "คุณจะไม่สามารถกู้ข้อมูลงานนี้ได้",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      });
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "ลบงานเรียบร้อยแล้ว.", "success");
        // ...perform the delete action
      }
      else {
        Swal.fire("Cancelled", "ยกเลิกแล้ว :)", "error");
      }
    };
    const jobStateColor = (state: string) => {
      return state === "on" ? "green" : "red";
    };
    return {
      router,
      route,
      company,
      jobs,
      viewJob,
      deleteForm,
      activeTab: "jobs",
      isEnabled: false,
      JobStatus,
      jobStateColor,
      user,
      store
      //  jobActiveComputed,
    };
  },
  methods: {
    setActiveTab(tab: string) {
      this.activeTab = tab;
    },
  }
});
</script>

<style scoped>
.card-container {
  background-color: #ddd9d1;
}

.card-content {
  background-color: #f0ede9
}

.head-content {
  padding: 1rem;

}

.job-detail {
  border-radius: 6px;
  padding: 1rem;
  background-color: rgb(255, 255, 255);
}

.job-detai-text {
  padding-left: 1rem;
  color: rgb(0, 0, 0);
}

.job-card {
  padding: 0.5rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 1rem;
  background-color: #ddd9d1;
}

.edit button {
  margin-right: 0.3rem;
}

.edit {
  align-items: center;
}

/*toggle swtch*/
</style>
