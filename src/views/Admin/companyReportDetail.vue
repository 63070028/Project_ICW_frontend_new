<template>
  <div class="company p-3">
    <div class="columns">
      <div class="column is-12" style="background-color: #f1f1f1">
        <div class="card" style="min-height: 100vh">
          <div class="card-content">
            <div class="content">
              <div
                v-show="activeTab === 'jobs'"
                style="background-color: #f6f6f6"
              >
                <h1 class="title">งานทั้งหมดของบริษัท {{ route.params.id }}</h1>

                <div class="job-card" v-for="(job, index) in jobs" :key="index">
                  <div class="job-detail">
                    <p class="is-size-4 has-text-weight-bold" >{{ index + 2 + "." }} {{ job.name }}</p>
                      <p class="job-detai-text">สถานที่ทำงาน: {{ job.location }}</p>
                      <p class="job-detai-text">ค่าตอบแทนรายวัน: {{ job.salary_per_day }}</p>
                      <p class="job-detai-text">รูปแบบการสัมภาษณ์: {{ job.interview }}</p>
                      <p class="job-detai-text">จำนวนที่รับ: {{ job.capacity }}</p>
                      <div class="column is-6 edit" style="background-color: #your_color_code;">
                        <div class="field" style="background-color: #your_color_code;">
                          <v-switch
                            v-model="job.active"
                            hide-details
                            inset
                            color="success"
                            :true-value="JobStatus.Open"
                            :false-value="JobStatus.Closed"
                            :label="`สถานะงาน: ${job.active}`"
                            :style="{ color: jobStatusColor(job.active) }">
                          </v-switch>
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
import Job from "@/models/Job2";
import { JobStatus } from "@/models/Job2";
import Swal from "sweetalert2";

export default defineComponent({
  name: "App",

  setup() {
    const router = useRouter();
    const route = useRoute();

    //def
    const company = reactive<Company>({
      id:"",
      name: "None",
      description: "None",
      profile_image: "",
      background_image: "",
      video_iframe: "",
      state:""
    });

    const jobs = reactive<Job[]>([]);

    onMounted(() => {
      console.log("get api company id: " + route.params.id);

      //set company
      const get_company = {
        id: 1,
        name: "ไม่ทำงาน จำกัด หมาชน",
        description:
          "THiNKNET คือ บริษัท IT ที่สร้างสรรค์ผลิตภัณฑ์และบริการที่มุ่งพัฒนาคุณภาพชีวิตของคนไทยให้ดีขึ้น ก่อตั้งขึ้นในปี 2000 ผลงานโดดเด่นคือ JobThai แพลตฟอร์มหาคน หางาน สมัครงานอันดับ 1 ของประเทศ ที่ช่วยให้คนไทยมีงานทำมานานมากกว่า 20 ปี นอกจากนี้แล้ว THiNKNET ยังพัฒนาสินค้าและบริการอื่น ๆ ออกมาอยู่เสมอ เช่น Mapping & GIS Solutions, THiNKNET Design Studio",
        profile_image:
          "https://cdn.discordapp.com/attachments/905751963017285634/1089481386349580359/profile-icon-design-free-vector.png",
        background_image: "https://www.w3schools.com/w3images/workbench.jpg",
        video_iframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
      };
      Object.assign(company, get_company);

      console.log("get api job by company_id: " + route.params.id);

      let get_jobs: Job[] = [
        {
          id: 1,
          company_id: 1,
          name: "ฝึกงาน ตำแหน่ง Software Engineer",
          salary_per_day: 500,
          location: "sssss",
          capacity: 10,
          detail: "มาร่วมงานกับ THiNKNET ...",
          interview: "online",
          qualifications: ["111", "2222"],
          contact: {
            name: "chanapon",
            email: "xxxxx@hotmail.com",
            phone: "08xxxxxxxx",
          },
          creation_date: "03/25/2015",
          active: JobStatus.Open,
        },
        {
          id: 2,
          company_id: 1,
          name: "ฝึกงาน ตำแหน่ง Software Engineer",
          salary_per_day: 500,
          location: "sssss",
          capacity: 10,
          detail: "มาร่วมงานกับ THiNKNET ...",
          interview: "online",
          qualifications: ["111", "2222"],
          contact: {
            name: "chanapon",
            email: "xxxxx@hotmail.com",
            phone: "08xxxxxxxx",
          },
          creation_date: "03/25/2015",
          active: JobStatus.Closed,
        },
        {
          id: 3,
          company_id: 1,
          name: "ฝึกงาน ตำแหน่ง Software Engineer",
          salary_per_day: 500,
          location: "sssss",
          capacity: 10,
          detail: "มาร่วมงานกับ THiNKNET ...",
          interview: "online",
          qualifications: ["111", "2222"],
          contact: {
            name: "chanapon",
            email: "xxxxx@hotmail.com",
            phone: "08xxxxxxxx",
          },
          creation_date: "03/25/2015",
          active: JobStatus.Open,
        },
      ];

      get_jobs.forEach((job) => {
        jobs.push(job);
      });
    });

    const viewJob = (id: number) => {
      router.push("/jobs/" + id);
    };
    const jobStatusColor = (status: JobStatus) => {
      return status === JobStatus.Open ? "green" : "red";
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
          jobs.splice(index - 1, 1);
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
      jobs,
      viewJob,
      deleteJob,
      jobStatusColor,
      JobStatus,
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