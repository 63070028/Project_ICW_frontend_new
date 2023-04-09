<template>
  <div class="company p-3">
    <div class="columns">
      <div class="column is-3" style="background-color: #f8f8f8">
        <aside class="menu">
          <p class="menu-label">Navigation</p>
          <ul class="menu-list">
            <li><router-link :class="{ 'is-active': activeTab === 'info' }" @click="setActiveTab('info')" to="/companyProfile">ข้อมูลบริษัท</router-link></li>
            <li><router-link :class="{ 'is-active': activeTab === 'jobs' }" @click="setActiveTab('jobs')" to="/companyJob">งานที่ประกาศ</router-link></li>
            <li><router-link :class="{ 'is-active': activeTab === 'programs' }" @click="setActiveTab('programs')" to="/companyProgram">โครงการพิเศษ</router-link></li>
          </ul>
        </aside>
      </div>
      <div class="card-container column is-9" >
        <div class="card" style="min-height: 100vh ">
          <div class="card-content">
            <div class="content" >
              <div  v-show="activeTab === 'jobs'">
                <div class="head-content">
                  <router-link to="/companyAddJob">
                    <button class="button is-success ">เพิ่มประกาศงาน</button>
                  </router-link>
                  <h1 class="title">งานที่ประกาศ</h1>
                </div>
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
</template>
<script lang="ts">
import "bulma/css/bulma.css";
import { defineComponent, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import Company from "@/models/Company";
import Job2 from "@/models/Job2";
import Swal from "sweetalert2";
import { JobStatus } from "@/models/Job2";

export default defineComponent({
  name: "App",
  data: () => ({
    model: "no",
  }),
  setup() {
    const router = useRouter();
    const route = useRoute();
    const company = reactive<Company>({
      id: Number(route.params.id),
      name: "None",
      description: "None",
      profile_image: "",
      background_image: "",
      vdo: "",
    });
    const jobs = reactive<Job2[]>([]);
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
        vdo: '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
      };
      Object.assign(company, get_company);
      console.log("get api job by company_id: " + route.params.id);

      let get_jobs: Job2[] = [
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
      } else {
        Swal.fire("Cancelled", "ยกเลิกแล้ว :)", "error");
      }
    };
    const jobStatusColor = (status: JobStatus) => {
      return status === JobStatus.Open ? "green" : "red";
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
      jobStatusColor,
      //  jobActiveComputed,
    };
  },
  methods: {
    setActiveTab(tab: string) {
      this.activeTab = tab;
    },
  },

  // Add this inside the setup() function
});
</script>

<style scoped>

.card-container{
  background-color: #ddd9d1;
}
.card-content{
  background-color: #f0ede9
}
.head-content{
  padding: 1rem;
  
}
.job-detail{
  border-radius: 6px;
  padding: 1rem;
  background-color: rgb(255, 255, 255);
}
.job-detai-text{
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
