<template>
  <div class="company p-3">
    <div class="columns">
      <div class="column is-12" style="background-color: #f1f1f1">
        <div class="card" style="min-height: 100vh">
          <div class="card-content">
            <div class="content">
              <div v-show="activeTab === 'jobs'" style="background-color: #f6f6f6">
                <h1 class="title">งานทั้งหมดของบริษัท {{ company.name }}</h1>

                <div class="job-card" v-for="(job, index) in jobs" :key="index">
                  <div class="job-detail">
                    <p class="is-size-4 has-text-weight-bold">
                      {{ index + 2 + "." }} {{ job.name }}
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
                    <button v-if="job.state == 'on'" class="button is-success" @click="changeState(job)">on</button>
                    <button v-else class="button is-danger" @click="changeState(job)">off</button>
                    <div class="column is-6 edit" style="background-color: #your_color_code">
                      <div class="field" style="background-color: #your_color_code"></div>
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
import {def_company, def_job} from "@/plugins/defaultValue"

export default defineComponent({
  name: "App",

  setup() {
    const router = useRouter();
    const route = useRoute();


    //def
    const company = reactive<Company>(def_company);

    const job = reactive<Job>(def_job);

    const job2 = reactive<Job>(def_job);

    const jobs = reactive<Job[]>([]);
    onMounted(() => {
      axios
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
    });

    const viewJob = (id: number) => {
      router.push("/jobs/" + id);
    };

    const changeState = async (stateChange: Job) => {
      if (stateChange.state == "on") {
        stateChange.state = "off"
      } else {
        stateChange.state = "on"
      }

      console.log(stateChange)
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
      changeState
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
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  background-color: #ffffff;
}
</style>