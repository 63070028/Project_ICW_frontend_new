<template>
  <preloadingVue v-if="store.state.isLoadingData"></preloadingVue>
  <div class="company p-3" v-if="!isAddJob && !isEditJob && !store.state.isLoadingData">
    <div class="columns">
      <div class="column is-3" style="background-color: #f8f8f8">
        <aside class="menu">
          <p class="menu-label">Navigation</p>
          <ul class="menu-list">
            <li>
              <router-link
                :class="{ 'is-active': activeTab === 'info' }"
                @click="setActiveTab('info')"
                to="/companyProfile"
                >ข้อมูลบริษัท</router-link
              >
            </li>
            <li>
              <router-link
                :class="{ 'is-active': activeTab === 'jobs' }"
                @click="setActiveTab('jobs')"
                to="/companyJob"
                >งานที่ประกาศ</router-link
              >
            </li>
            <li>
              <router-link
                :class="{ 'is-active': activeTab === 'programs' }"
                @click="setActiveTab('programs')"
                to="/companyProgram"
                >โครงการพิเศษ</router-link
              >
            </li>
          </ul>
        </aside>
      </div>
      <div class="card-container column is-9">
        <div class="card" style="min-height: 100vh">
          <div class="card-content">
            <div class="content">
              <div v-show="activeTab === 'jobs'">
                <div class="head-content">
                  <button class="button is-success" @click="isAddJob = true">
                    เพิ่มประกาศงาน
                  </button>

                  <h1 class="title">งานที่ประกาศ</h1>
                </div>
                <div class="job-card" v-for="(job, index) in jobs" :key="index">
                  <div class="job-detail">
                    <p class="is-size-4 has-text-weight-bold">
                      {{ index + 1 + "." }} {{ job.name }}
                    </p>
                    <p class="job-detai-text">
                      สถานที่ทำงาน: {{ job.location }}
                    </p>
                    <p class="job-detai-text">
                      ค่าตอบแทนรายวัน: {{ job.salary_per_day }}
                    </p>
                    <p class="job-detai-text">
                      รูปแบบการสัมภาษณ์: {{ job.interview }}
                    </p>
                    <p class="job-detai-text">
                      จำนวนที่รับ: {{ job.capacity }}
                    </p>
                    <div
                      class="column is-6 edit"
                      style="background-color: #your_color_code"
                    >
                      <div
                        class="field"
                        style="background-color: #your_color_code"
                      >
                        <v-switch
                          v-model="job.state"
                          hide-details
                          inset
                          color="success"
                          :true-value="JobStatus.Open"
                          :false-value="JobStatus.Closed"
                          :label="`สถานะงาน: ${job.state}`"
                          :style="{ color: jobStateColor(job.state) }"
                          @change="updateJobState(job.id, job.state)"
                        >
                        </v-switch>

                        <button
                          class="button is-small is-info"
                          @click="updateEdit(index)"
                        >
                          แก้ไขงาน
                        </button>
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

  <CompanyAddjob
    :company_id="company.id"
    :company_name="company.name"
    v-if="isAddJob"
    @addNewJob="
      ($event) => {
        isAddJob = $event;
      }
    "
    @saveNewJob="updateNewJob($event)"
  ></CompanyAddjob>

  <companyEditjob
    v-if="isEditJob && selectedJob"
    :key="selectedJob.id"
    :id="selectedJob.id"
    :company_id="selectedJob.company_id"
    :company_name="selectedJob.company_name"
    :name="selectedJob.name"
    :salary_per_day="Number(selectedJob.salary_per_day)"
    :location="selectedJob.location"
    :capacity="Number(selectedJob.capacity)"
    :detail="selectedJob.detail"
    :interview="selectedJob.interview"
    :qualifications="selectedJob.qualifications"
    :contact="selectedJob.contact"
    :creation_date="selectedJob.creation_date"
    :state="selectedJob.state"
    @updateJobEdit="
      ($event) => {
        isEditJob = $event;
      }
    "
    @saveJobEdit="updateCompanyJob($event)"
    @jobDeleted="updateDelJob($event)"
  >
  </companyEditjob>
</template>
<script lang="ts">
import "bulma/css/bulma.css";
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Company from "@/models/Company";
import Swal from "sweetalert2";
import { JobStatus } from "@/models/Job2";
import CompanyAddjob from "@/components/company-addjob.vue";
import companyEditjob from "@/components/company-editjob.vue";
import axios from "@/plugins/axios";
import { PORT } from "@/port";
import { useStore } from "vuex";
import User from "@/models/User";
import Job from "@/models/Job";
import preloadingVue from "@/components/pre-loading.vue";
import { def_company } from "@/plugins/defaultValue";
import getUserData from "@/plugins/getUser";

export default defineComponent({
  components: {
    CompanyAddjob,
    preloadingVue,
    companyEditjob,
  },
  data: () => ({
    model: "no",
  }),

  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const user = reactive<User>(store.state.user);

    const isAddJob = ref<boolean>(false);
    const isEditJob = ref<boolean>(false);
    const company = reactive<Company>(def_company);
    const jobs = reactive<Job[]>([]);

    const selectedJobIndex = ref<number>(-1);

    onMounted(async () => {
      if (!localStorage.getItem("token")) {
        router.push("/signIn");
        return;
      }
      store.commit("LOADING_DATA", true);

      await getUserData();

      await axios
        .get(`${PORT}` + "/company/getProfile/" + user.id)
        .then((res) => {
          console.log(res.data.company);
          Object.assign(company, res.data.company);
        });

      await axios.get(`${PORT}` + "/company/getJob/" + user.id).then((res) => {
        console.log(res.data);
        Object.assign(jobs, res.data.job);
      });

      store.commit("LOADING_DATA", false);
      console.log("get api company id: " + user.id);
    });
    const jobStateColor = (state: string) => {
      return state === "on" ? "green" : "red";
    };

    const updateCompanyJob = (updatedJob: Job) => {
      const index = jobs.findIndex((job) => job.id === updatedJob.id);
      if (index !== -1) {
        jobs[index] = updatedJob;
      }
    };

    const updateNewJob = (change_data: Job) => {
      jobs.push(change_data);
    };

    const updateDelJob = (job_id: string) => {
      const index = jobs.findIndex((job) => job.id === job_id);
      if (index !== -1) {
        jobs.splice(index, 1);
      }
    };

    const updateEdit = (index: number) => {
      selectedJobIndex.value = index;
      isEditJob.value = true;
    };

    const selectedJob = computed(() => {
      return selectedJobIndex.value >= 0 ? jobs[selectedJobIndex.value] : null;
    });

    return {
      router,
      route,
      company,
      jobs,
      activeTab: "jobs",
      isEnabled: false,
      JobStatus,
      updateCompanyJob,
      updateNewJob,
      jobStateColor,
      updateEdit,
      updateDelJob,
      selectedJob,
      selectedJobIndex,
      store,
      user,
      isAddJob,
      isEditJob,
    };
  },

  methods: {
    setActiveTab(tab: string) {
      this.activeTab = tab;
    },
    async updateJobState(id: string, newState: string) {
      const stateText =
        newState === JobStatus.Open ? "เปิดรับสมัคร" : "ปิดรับสมัคร";
      try {
        await axios.post(`${PORT}/company/setJobState`, {
          id: id,
          state: stateText,
        });
        Swal.fire({
          title: "Success",
          text: "Job state updated successfully",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to update the job state",
          icon: "error",
        });
        console.error(error);
      }
    },
    // updateEdit(index: number) {
    //   this.selectedJobIndex = index;
    // },
  },
});
</script>

<style scoped>
.card-container {
  background-color: #ddd9d1;
}

.card-content {
  background-color: #f0ede9;
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
