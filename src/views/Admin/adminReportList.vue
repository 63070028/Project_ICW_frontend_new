<template>
  <preLoadingVue v-if="store.state.isLoadingData"></preLoadingVue>
  <div class="company p-3" v-if="!store.state.isLoadingData">
    <div class="columns">
      <div class="column is-3">
        <aside class="menu">
          <ul class="menu-list">
            <li>
              <router-link :class="{ 'is-active': activeTab === 'jobs' }" @click="setActiveTab('jobs')"
                to="/dashboard">งานที่ได้รับแจ้ง</router-link>
            </li>
            <li>
              <router-link :class="{ 'is-active': activeTab === 'companys' }" @click="setActiveTab('companys')"
                to="/reportCommpanyList">บริษัททั้งหมด</router-link>
            </li>
          </ul>
        </aside>
      </div>
      <div class="column is-9">
        <div class="card" style="min-height: 100vh">
          <div class="card-content">
            <div class="content">
              <div v-show="activeTab === 'jobs'" >
                <h1 class="title">งานที่ได้รับแจ้ง</h1>
                <div class="job-card"  v-for="(jobReport, index) in jobReports" :key="index">
                  <div class="columns">
                    <div class="column is-11" @click="viewJob(jobReport.job_id)">
                      <p class="is-size-4 has-text-weight-bold">
                        {{ index + 1 + "." }} บริษัท: {{ jobReport.company_name }}
                      </p>
                      <p class="is-size-4 has-text-weight-bold ml-5">
                           งาน: {{ jobReport.job_name }}
                      </p>
                      <div class="columns is-multiline ml-5 mt-1">
                        <p class="column is-8">
                          หมายเลข ID ของผู้รายงาน: {{ jobReport.user_id }}
                        </p>
                        <p class="column">
                          วันที่รายงาน: {{ jobReport.creation_date }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p class="column is-6 ml-5 has-text-weight-bold">
                    ข้อความจากผู้รายงาน:
                  </p>
                  <p class="column is-6  ml-5 "> {{ jobReport.message }}</p>
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
import "bulma/css/bulma.css";
import { defineComponent, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import JobReport from "@/models/JobReport";
import axios from "axios";
import { PORT } from "@/port";
import preLoadingVue from "@/components/pre-loading.vue";
import { useStore } from "vuex";
import User from "@/models/User";
import getUserData from "@/plugins/getUser";


export default defineComponent({
  components:{
    preLoadingVue
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const user = reactive<User>(store.state.user);


    const jobReports = reactive<JobReport[]>([]);

    onMounted(async () => {
      store.commit('LOADING_DATA', true)
      await getUserData();

      console.log("get api job by company_id: " + route.params.id);
      await axios
        .get(`${PORT}` + "/admin/getReportJob")
        .then((response) => {
          console.log(response.data.items);
          const get_jobReport: JobReport[] = response.data.items;
          get_jobReport.sort((a, b) => new Date(a.creation_date) < new Date(b.creation_date) ? 1 : -1);
          console.log(get_jobReport);
          get_jobReport.forEach((job) => {
            console.log(job)
            jobReports.push(job);
          });
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });

        store.commit('LOADING_DATA', false)

    });

    const viewJob = (id: string) => {
      router.push("/jobs/" + id);
    };
    return {
      router,
      route,
      jobReports,
      viewJob,
      activeTab: "jobs",
      store,
      user
    };
  },
  methods: {
    setActiveTab(tab: string) {
      this.activeTab = tab;
    },
  },
});
</script>

<style scoped>
.job-card {
  border: 0.5px solid black;
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  background-color: #ffffff;
}
</style>