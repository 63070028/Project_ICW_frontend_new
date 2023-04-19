<template>
  <div class="company p-3">
    <div class="columns">
      <div class="column is-3" style="background-color: #f8f8f8">
        <aside class="menu">
          <p class="menu-label">Navigation</p>
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
      <div class="column is-9" style="background-color: #f1f1f1">
        <div class="card" style="min-height: 100vh">
          <div class="card-content">
            <div class="content">
              <div v-show="activeTab === 'jobs'" style="background-color: #f6f6f6">
                <h1 class="title">งานที่ได้รับแจ้ง</h1>

                <div class="job-card" v-for="(jobReport, index) in jobReports" :key="index">
                  <div class="columns">
                    <div class="column is-11" @click="viewJob(jobReport.job_id)">
                      <p class="is-size-4 has-text-weight-bold">
                        {{ index + 1 + "." }} {{ jobReport.company_name }} ({{jobReport.company_id}})
                      </p>
                      <p class="is-size-4 has-text-weight-bold ml-6">
                        {{ jobReport.job_name }} ({{ jobReport.job_id }})
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
import Company from "@/models/Company";
import Swal from "sweetalert2";
import JobReport from "@/models/JobReport";
import axios from "axios";
import { PORT } from "@/port";
import {def_company} from "@/plugins/defaultValue"


export default defineComponent({
  name: "App",

  setup() {
    const router = useRouter();
    const route = useRoute();

    //def
    const company = reactive<Company>(def_company);
    const jobReports = reactive<JobReport[]>([]);

    onMounted(() => {
      console.log("get api company id: " + route.params.id);

      console.log("get api job by company_id: " + route.params.id);
      axios
        .get(`${PORT}` + "/admin/getReportJob")
        .then((response) => {
          console.log(response.data.items);
          const get_jobReport: JobReport[] = response.data.items;
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
    });

    const viewJob = (id: string) => {
      router.push("/jobs/" + id);
    };
    const deleteJob = (index: number) => {
      //ปฏิs
      Swal.fire({
        title: "ยืนยันลบงานนี้หรือไม่",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "hsl(141, 50%, 48%)",
        cancelButtonColor: "hsl(348, 100%, 61%)",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          jobReports.splice(index - 1, 1);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "ทำการลบผู้สมัครเรียบร้อย",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    };
    return {
      router,
      route,
      company,
      jobReports,
      viewJob,
      deleteJob,
      activeTab: "jobs",
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