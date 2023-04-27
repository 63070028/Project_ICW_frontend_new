<template>
  <preLoadingVue v-if="store.state.isLoadingData"></preLoadingVue>
  <div class="company p-3" v-if="!store.state.isLoadingData">
    <div class="columns">
      <div class="column is-12">
        <div class="card" style="min-height: 100vh">
          <div class="card-content">
            <div class="content">
              <div v-show="activeTab === 'jobs'">
                <h1 class="title">งานทั้งหมดของบริษัท {{ company.name }}</h1>

                <div class="job-card" v-for="(job, index) in jobs" :key="index">
                  <div class="job-detail">
                    <p class="is-size-4 has-text-weight-bold">
                      {{ index + 1 + "." }} {{ job.name }}
                    </p>
                    <div class="columns is-multiline ml-6 mt-1">
                      <div class="column is-6">
                        <i class="pi pi-map-marker">
                          <span class="is-size-5 pl-4"
                            ><b>สถานที่ทำงาน: </b>{{ job.location }}</span
                          ></i
                        >
                      </div>
                      <div class="column is-6">
                        <i class="pi pi-dollar">
                          <span class="is-size-5 pl-4"
                            ><b>ค่าตอบแทนรายวัน: </b>{{ job.location }}</span
                          ></i
                        >
                      </div>
                      <div class="column is-6">
                        <i class="pi pi-user"
                          ><span class="is-size-5 pl-4"
                            ><b>จำนวนคำที่รับ: </b>{{ job.capacity }}</span
                          ></i
                        >
                      </div>
                      <p class="is-size-5 column is-6">
                        <b>รูปแบบการสัมภาษณ์: </b>{{ job.interview }}
                      </p>

                      <button
                        v-if="job.state == 'on'"
                        class="button is-success"
                        @click="changeState(job)"
                      >
                        on
                      </button>
                      <button
                        v-else
                        class="button is-danger"
                        @click="changeState(job)"
                      >
                        off
                      </button>
                      <div
                        class="column is-6 edit"
                        style="background-color: #your_color_code"
                      >
                        <div
                          class="field"
                          style="background-color: #your_color_code"
                        ></div>
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
</template>

<script lang="ts">
import "bulma/css/bulma.css";
import { defineComponent, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import Company from "@/models/Company";
import Job from "@/models/Job";
import Swal from "sweetalert2";
import axios from "axios";
import { PORT } from "@/port";
import { def_company, def_job } from "@/plugins/defaultValue";
import User from "@/models/User";
import { useStore } from "vuex";
import getUserData from "@/plugins/getUser";
import preLoadingVue from "@/components/pre-loading.vue";
import "primeicons/primeicons.css";

export default defineComponent({
  components: {
    preLoadingVue,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const user = reactive<User>(store.state.user);
    //def

    //def
    const company = reactive<Company>(def_company);

    const job = reactive<Job>(def_job);

    const job2 = reactive<Job>(def_job);

    const jobs = reactive<Job[]>([]);
    onMounted(async () => {
      store.commit("LOADING_DATA", true);

      await getUserData();
      await axios
        .get(`${PORT}` + "/admin/getCompanyJobByCompanyId/" + route.params.id)
        .then((response) => {
          const get_company_job: Job[] = response.data.items;
          get_company_job.forEach((job) => {
            jobs.push(job);
          });
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
      store.commit("LOADING_DATA", false);
    });

    const viewJob = (id: number) => {
      router.push("/jobs/" + id);
    };

    const changeState = async (stateChange: Job) => {
      if (stateChange.state == "on") {
        stateChange.state = "off";
      } else {
        stateChange.state = "on";
      }

      console.log(stateChange);
      axios
        .post(`${PORT}` + "/admin/changeJobState", stateChange)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    };

    return {
      router,
      route,
      company,
      job,
      job2,
      jobs,
      viewJob,
      activeTab: "jobs",
      changeState,
      store,
      user,
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