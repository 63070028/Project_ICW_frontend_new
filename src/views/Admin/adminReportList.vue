<template>
  <div class="company p-3">
    <div class="columns" >
      <div class="column is-3" style="background-color: #f8f8f8; ">
        <aside class="menu">
          <p class="menu-label">Navigation</p>
          <ul class="menu-list">
            <li><router-link :class="{ 'is-active': activeTab === 'jobs' }" @click="setActiveTab('jobs')" to="/reportList">งานที่ได้รับแจ้ง</router-link></li>
            <li><router-link :class="{ 'is-active': activeTab === 'companys' }" @click="setActiveTab('companys')" to="/reportCommpanyList">บริษัทที่ได้รับแจ้ง</router-link></li>
          </ul>
        </aside>
      </div>
      <div class="column is-9" style="background-color: #f1f1f1; ">
        <div class="card" style="min-height: 100vh;">
          <div class="card-content" >
            <div class="content" >
                <div v-show="activeTab === 'jobs'" style="background-color: #f6f6f6;">
                    <h1 class="title">งานที่ได้รับแจ้ง</h1>
                    
                    <div class="job-card" v-for="job, index in jobs" :key="index">
                    <div class="columns">
                      <div class="column is-11" @click="viewJob(job.id)">
                        <p class="is-size-4 has-text-weight-bold">{{ index + 1 + "." }} {{ job.name }}</p>
                        <div class="columns is-multiline ml-6 mt-1">
                          <p class="column is-6">สถานที่ทำงาน: {{ job.location }}</p>
                          <p class="column is-6">ค่าตอบแทนรายวัน: {{ job.salary_per_day }}</p>
                          <p class="column is-6">รูปแบบการสัมภาษณ์: {{ job.interview }}</p>
                          <p class="column is-6">จำนวนที่รับ: {{ job.capacity }}</p>
                          <p class="column is-6">จากบริษัทหมายเลข: {{ job.company_id }}</p>
                        </div>
                      </div>
                      <div class="column is-1">

                          <button @click="deleteJob(job.id)" class="button is-small is-danger">ปิดงานนี้</button>

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
import 'bulma/css/bulma.css';
import { defineComponent, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Company from '@/models/Company';
import Job from '@/models/Job';
import Swal from "sweetalert2";

export default defineComponent({
name: 'App',
  
    setup() {
        const router = useRouter();
        const route = useRoute();

        //def
        const company = reactive<Company>({
            id: Number(route.params.id),
            name: "None",
            description: "None",
            profile_image: "",
            background_image: "",
            vdo: ""
        });

        const jobs = reactive<Job[]>([])


        onMounted(() => {
            console.log('get api company id: ' + route.params.id)

            //set company
            const get_company = { id: 1, name: "ไม่ทำงาน จำกัด หมาชน", description:"THiNKNET คือ บริษัท IT ที่สร้างสรรค์ผลิตภัณฑ์และบริการที่มุ่งพัฒนาคุณภาพชีวิตของคนไทยให้ดีขึ้น ก่อตั้งขึ้นในปี 2000 ผลงานโดดเด่นคือ JobThai แพลตฟอร์มหาคน หางาน สมัครงานอันดับ 1 ของประเทศ ที่ช่วยให้คนไทยมีงานทำมานานมากกว่า 20 ปี นอกจากนี้แล้ว THiNKNET ยังพัฒนาสินค้าและบริการอื่น ๆ ออกมาอยู่เสมอ เช่น Mapping & GIS Solutions, THiNKNET Design Studio", profile_image:"https://cdn.discordapp.com/attachments/905751963017285634/1089481386349580359/profile-icon-design-free-vector.png", background_image:"https://www.w3schools.com/w3images/workbench.jpg", vdo:'<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' }
            Object.assign(company, get_company)
            

            console.log('get api job by company_id: ' + route.params.id);

            let get_jobs:Job[] = [
            { id: 1, company_id: 1, name: "ฝึกงาน ตำแหน่ง Software Engineer", salary_per_day: 500, location: "sssss", capacity: 10, detail: "มาร่วมงานกับ THiNKNET หากคุณมีความหลงใหลในการใช้เทคโนโลยีเพื่อการพัฒนาหรือแก้ไขปัญหาต่าง ๆ และพร้อมที่จะเรียนรู้สิ่งใหม่ ๆ อยู่เสมอ เราคือองค์กรที่รวบรวมคนที่มีความรู้ความสามารถ มีสปิริต มีแพสชัน และมีความคิดสร้างสรรค์มาร่วมกันสร้างนวัตกรรมที่มีคุณค่าต่อสังคมและโลกใบนี้", interview: "online", qualifications: ["111", "2222"], contact: { name: "chanapon", email: "xxxxx@hotmail.com", phone: "08xxxxxxxx" }, creation_date: "03/25/2015" },
            { id: 2, company_id: 1, name: "ฝึกงาน ตำแหน่ง เพสัช", salary_per_day: 500, location: "sssss", capacity: 10, detail: "มาร่วมงานกับ THiNKNET หากคุณมีความหลงใหลในการใช้เทคโนโลยีเพื่อการพัฒนาหรือแก้ไขปัญหาต่าง ๆ และพร้อมที่จะเรียนรู้สิ่งใหม่ ๆ อยู่เสมอ เราคือองค์กรที่รวบรวมคนที่มีความรู้ความสามารถ มีสปิริต มีแพสชัน และมีความคิดสร้างสรรค์มาร่วมกันสร้างนวัตกรรมที่มีคุณค่าต่อสังคมและโลกใบนี้", interview: "online", qualifications: ["111", "2222"], contact: { name: "chanapon", email: "xxxxx@hotmail.com", phone: "08xxxxxxxx" }, creation_date: "03/25/2015" },
            { id: 3, company_id: 1, name: "ฝึกงาน ตำแหน่ง บริหาร", salary_per_day: 500, location: "sssss", capacity: 10, detail: "มาร่วมงานกับ THiNKNET หากคุณมีความหลงใหลในการใช้เทคโนโลยีเพื่อการพัฒนาหรือแก้ไขปัญหาต่าง ๆ และพร้อมที่จะเรียนรู้สิ่งใหม่ ๆ อยู่เสมอ เราคือองค์กรที่รวบรวมคนที่มีความรู้ความสามารถ มีสปิริต มีแพสชัน และมีความคิดสร้างสรรค์มาร่วมกันสร้างนวัตกรรมที่มีคุณค่าต่อสังคมและโลกใบนี้", interview: "online", qualifications: ["111", "2222"], contact: { name: "chanapon", email: "xxxxx@hotmail.com", phone: "08xxxxxxxx" }, creation_date: "03/25/2015" },
            ]

            get_jobs.forEach(job => {
                jobs.push(job)
            });
        });

        const viewJob = (id: number) => {
            router.push("/jobs/" + id)
        }
        const deleteJob = (index: number) => {
            //ปฏิs
            Swal.fire({
                title: 'ยืนยันลบงานนี้หรือไม่',
                text: "",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'hsl(141, 50%, 48%)',
                cancelButtonColor: 'hsl(348, 100%, 61%)',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.isConfirmed) {
                    jobs.splice(index-1, 1)
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'ทำการลบผู้สมัครเรียบร้อย',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        };
        return {
            router,
            route,
            company,
            jobs,
            viewJob,
            deleteJob,
            activeTab: 'jobs',
        }
    },
methods: {
    setActiveTab(tab: string) {
      this.activeTab = tab;
    },

  }
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