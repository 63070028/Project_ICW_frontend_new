<template>
  <div class="company p-3">
    <div class="columns" >
      <div class="column is-3" style="background-color: #f8f8f8; ">
        <aside class="menu">
          <p class="menu-label">Navigation</p>
          <ul class="menu-list">
            <li><router-link :class="{ 'is-active': activeTab === 'info' }" @click="setActiveTab('info')" to="/companyProfile">ข้อมูลบริษัท</router-link></li>
            <li><router-link :class="{ 'is-active': activeTab === 'jobs' }" @click="setActiveTab('jobs')" to="/companyJob">งานที่ประกาศ</router-link></li>
            <li><router-link :class="{ 'is-active': activeTab === 'programs' }" @click="setActiveTab('programs')" to="/companyProgram">โครงการพิเศษ</router-link></li>
          </ul>
        </aside>
      </div>
      <div class="card-container column is-9">
        <div class="card" style="min-height: 100vh;">
          <div class="card-content">
            <div class="content">
              <div v-show="activeTab === 'programs'">
                <div class="head-content">
                  <router-link to="/companyAddProgram">
                    <button class="button is-success ">เพิ่มโครงการพิเศษ</button>
                  </router-link>
                  <h1 class="title">โครงการพิเศษ</h1>
                </div>
                
                <div class="program-card" v-for="program, index in programs" :key="index">
                <div class="job-detail">
                  <p class="is-size-4 has-text-weight-bold">{{ index + 2 + "." }} {{ program.name }}</p>
                  <div class="columns">
                    <div class="column is-4 ">
                      <div class="program-image image is-2by1">
                        <img :src="program.image" alt="Program Image" />
                      </div>
                    </div>
                    <div class="column is-8">
                      
                        <p class="job-detai-text">คำอธิบาย: {{ program.description }}</p>
                        <p class="job-detai-text">คอร์สเรียน: {{ program.course }}</p>
                        <p class="job-detai-text">ตำแหน่งงาน: {{ program.jobs_title.join(', ') }}</p>
                        <p class="job-detai-text">คุณสมบัติ: {{ program.qualifications.join(', ') }}</p>
                        <p class="job-detai-text">สิทธิประโยชน์: {{ program.privileges.join(', ') }}</p>
                        <v-switch
                          v-model="program.active"
                          hide-details
                          inset
                          color="success"
                          :true-value="ProgramStatus.Open"
                          :false-value="ProgramStatus.Closed"
                          :label="`สถานะงาน: ${program.active}`"
                          :style="{ color: ProgramStatusColor(program.active) }">
                        </v-switch>
                        <router-link :to="'/companyEditProgram/' + program.id">
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
import 'bulma/css/bulma.css';
import { defineComponent, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Program2 from '@/models/Program2';
import {ProgramStatus} from '@/models/Program2';
import Swal from 'sweetalert2';

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const programs = reactive<Program2[]>([])
    onMounted(() => {
      console.log('get api program by company_id: ' + route.params.id);
      let get_programs: Program2[] = [
        {
          id: 0,
          company_id: 1,
          name: "โครงการพิเศษ 1",
          description: "คำอธิบายโครงการพิเศษ 1",
          course: "คอร์สเรียน 1",
          jobs_title: ["ตำแหน่งงาน 1", "ตำแหน่งงาน 2"],
          qualifications: ["คุณสมบัติ 1", "คุณสมบัติ 2"],
          privileges: ["สิทธิประโยชน์ 1", "สิทธิประโยชน์ 2"],
          image: "https://www.w3schools.com/w3images/workbench.jpg", // เพิ่ม URL ของรูปภาพโครงการ
          active: ProgramStatus.Closed,
        },
        {
          id: 2,
          company_id: 2,
          name: "โครงการพิเศษ 2",
          description: "คำอธิบายโครงการพิเศษ 1",
          course: "คอร์สเรียน 1",
          jobs_title: ["ตำแหน่งงาน 1", "ตำแหน่งงาน 2"],
          qualifications: ["คุณสมบัติ 1", "คุณสมบัติ 2"],
          privileges: ["สิทธิประโยชน์ 1", "สิทธิประโยชน์ 2"],
          image: "https://images.unsplash.com/photo-1680562725444-5a9aaa12525b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", // เพิ่ม URL ของรูปภาพโครงการ
          active: ProgramStatus.Open,
        },
        // โครงการพิเศษอื่น ๆ
    ];
    get_programs.forEach(program => {
        programs.push(program);
    });
    });
    const viewProgram = (id: number) => {
      router.push("/companyEditProgram/" + id)
    };
    const deleteForm = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'คุณจะไม่สามารถกู้ข้อมูลโครงการนี้ได้',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    });

    if (result.isConfirmed) {
      Swal.fire('Deleted!', 'ลบโครงการเรียบร้อยแล้ว.', 'success');
      // ...perform the delete action
    } else {
      Swal.fire('Cancelled', 'ยกเลิกแล้ว :)', 'error');
    }
  };
    const ProgramStatusColor = (status: ProgramStatus) => {
      return status === ProgramStatus.Open ? "green" : "red";
    };
    return {
      router,
      route,
      programs,
      viewProgram,
      activeTab: 'programs',
      ProgramStatus,
      deleteForm,
      ProgramStatusColor
    }
  },
  methods: {
    setActiveTab(tab: string) {
      this.activeTab = tab;
    },
  },
});
</script>
<style scoped>


/*fix css*/
.card-container{
  background-color: #e9e9e9;
}
.card-content{
  background-color: #f0ede9
}
.head-content{
  padding: 1rem;
  
}
.program-image {
    background-color: #AEC2B6;
  }
.job-detail{
  border-radius: 6px;
  padding: 1rem;
  background-color: #f1f1f1;
}
.job-detai-text{
 
  color: rgb(0, 0, 0);
}
.program-card {
  padding: 0.5rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 1rem;
  background-color: #e9e9e9;
}
.button {
  margin-right: 0.3rem;
}
.edit {
  align-items: center;
}
</style>