<template>
    <div class="company p-3">
      <div class="columns">
        <div class="column is-3" style="background-color: #f8f8f8;">
          <aside class="menu">
            <p class="menu-label">Navigation</p>
            <ul class="menu-list">
              <li><router-link :class="{ 'is-active': activeTab === 'info' }" @click="setActiveTab('info')" to="/companyProfile">ข้อมูลบริษัท</router-link></li>
              <li><router-link :class="{ 'is-active': activeTab === 'jobs' }" @click="setActiveTab('jobs')" to="/companyJob">งานที่ประกาศ</router-link></li>
              <li><router-link :class="{ 'is-active': activeTab === 'programs' }" @click="setActiveTab('programs')" to="/companyProgram" >โครงการพิเศษ</router-link ></li>
            </ul>
          </aside>
        </div>
        <div class="column is-9" style="background-color: #f1f1f1;">
            <div class="card" style="min-height: 100vh;">
                <div class="card-content">
                    <div class="content">
                            <div class="company-edit-job">
                                <div class="column is-8">
                                    <h1 class="title">แก้ไขงาน</h1>
                                    <div class="field is-grouped">
                                      <div class="control">
                                          <button class="button is-link is-danger" @click="deleteForm">ลบงาน</button>
                                      </div>
                                    </div>
                                    <div class="field">
                                    <label class="label">ชื่องาน</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="job.name" />
                                    </div>
                                    </div>
                                    <div class="field">
                                    <label class="label">สถานที่ทำงาน</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="job.location" />
                                    </div>
                                    </div>
                                    <div class="field">
                                    <label class="label">ค่าตอบแทนรายวัน</label>
                                    <div class="control">
                                        <input class="input" type="number" v-model="job.salary_per_day" />
                                    </div>
                                    </div>
                                    <div class="field">
                                    <label class="label">รูปแบบการสัมภาษณ์</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="job.interview" />
                                    </div>
                                    </div>
                                    <div class="field">
                                    <label class="label">จำนวนที่รับ</label>
                                    <div class="control">
                                        <input class="input" type="number" v-model="job.capacity" />
                                    </div>
                                    </div>
                                    <div class="field">
                                      
                                    <div class="field is-grouped">
                                      <div class="control">
                                          <button class="button is-link" @click="saveJob">บันทึก</button>
                                      </div>
                                      <div class="control">
                                          <button class="button is-link is-light" @click="cancel">ยกเลิก</button>
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
import { defineComponent, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import Job from '@/models/Job';
import Swal from 'sweetalert2';

export default defineComponent({
  name: 'CompanyProfileEdit',

  setup() {
    const router = useRouter();
    const jobId = "";
    const job = reactive<Job>(
    {
    id:"",
    company_id:"",
    name:"",
    salary_per_day:0,
    location:"",
    capacity:0,
    detail:"",
    interview:"",
    qualifications:[],
    contact:{name:"", email:"", phone:""},
    creation_date:"",
    state:""
    }
    );

    const jobs = reactive<Job[]>([]);

    onMounted(() => {
    console.log('Load job data using id: ', jobId);
    let get_jobs:Job[] = [
    // { id: "", company_id: "", name: "ฝึกงาน ตำแหน่ง Software Engineer", salary_per_day: 500, location: "sssss", capacity: 10, detail: "มาร่วมงานกับ THiNKNET หากคุณมีความหลงใหลในการใช้เทคโนโลยีเพื่อการพัฒนาหรือแก้ไขปัญหาต่าง ๆ และพร้อมที่จะเรียนรู้สิ่งใหม่ ๆ อยู่เสมอ เราคือองค์กรที่รวบรวมคนที่มีความรู้ความสามารถ มีสปิริต มีแพสชัน และมีความคิดสร้างสรรค์มาร่วมกันสร้างนวัตกรรมที่มีคุณค่าต่อสังคมและโลกใบนี้", interview: "online", qualifications: ["111", "2222"], contact: { name: "chanapon", email: "xxxxx@hotmail.com", phone: "08xxxxxxxx" }, creation_date: "03/25/2015" },
    // { id: "", company_id: "", name: "ฝึกงาน ตำแหน่ง Software Engineer", salary_per_day: 500, location: "sssss", capacity: 10, detail: "มาร่วมงานกับ THiNKNET หากคุณมีความหลงใหลในการใช้เทคโนโลยีเพื่อการพัฒนาหรือแก้ไขปัญหาต่าง ๆ และพร้อมที่จะเรียนรู้สิ่งใหม่ ๆ อยู่เสมอ เราคือองค์กรที่รวบรวมคนที่มีความรู้ความสามารถ มีสปิริต มีแพสชัน และมีความคิดสร้างสรรค์มาร่วมกันสร้างนวัตกรรมที่มีคุณค่าต่อสังคมและโลกใบนี้", interview: "online", qualifications: ["111", "2222"], contact: { name: "chanapon", email: "xxxxx@hotmail.com", phone: "08xxxxxxxx" }, creation_date: "03/25/2015" },
    // { id: "", company_id: "", name: "ฝึกงาน ตำแหน่ง Software Engineer", salary_per_day: 500, location: "sssss", capacity: 10, detail: "มาร่วมงานกับ THiNKNET หากคุณมีความหลงใหลในการใช้เทคโนโลยีเพื่อการพัฒนาหรือแก้ไขปัญหาต่าง ๆ และพร้อมที่จะเรียนรู้สิ่งใหม่ ๆ อยู่เสมอ เราคือองค์กรที่รวบรวมคนที่มีความรู้ความสามารถ มีสปิริต มีแพสชัน และมีความคิดสร้างสรรค์มาร่วมกันสร้างนวัตกรรมที่มีคุณค่าต่อสังคมและโลกใบนี้", interview: "online", qualifications: ["111", "2222"], contact: { name: "chanapon", email: "xxxxx@hotmail.com", phone: "08xxxxxxxx" }, creation_date: "03/25/2015" },
    ];

    get_jobs.forEach(jobData => {
        jobs.push(jobData);
    });

    // Find the job with the matching jobId
    const jobToEdit = jobs.find(job => job.id === jobId);

    if (jobToEdit) {
        Object.assign(job, jobToEdit);
    } else {
        console.error('Job not found');
    }
});

    const saveJob = async () => {
      const result = await Swal.fire({
        title: 'ยืนยันการบันทึก?',
        text: 'คุณต้องการบันทึกข้อมูลการแก้ไขหรือไม่?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
      });

      if (result.isConfirmed) {
        console.log('Save updated job data:', job);
        router.push('/companyJob');
      }
    };
    const deleteForm = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'คุณจะไม่สามารถกู้ข้อมูลงานนี้ได้',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    });

    if (result.isConfirmed) {
      Swal.fire('Deleted!', 'ลบงานเรียบร้อยแล้ว.', 'success');
      // ...perform the delete action
    } else {
      Swal.fire('Cancelled', 'ยกเลิกแล้ว :)', 'error');
    }
  };
    const cancel = async () => {
      router.push('/companyJob');
    };

    return {
      job,
      saveJob,
      cancel,
      deleteForm,
      router,
      activeTab: 'jobs',
      
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
  .title {
    margin-bottom: 2rem;
  }
  </style>
  