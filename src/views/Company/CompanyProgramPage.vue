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
      <div class="column is-9" style="background-color: #f1f1f1; ">
        <div class="column is-9" style="background-color: #f1f1f1;">
        <div class="card" style="min-height: 100vh;">
          <div class="card-content">
            <div class="content">
              <div v-show="activeTab === 'programs'" style="background-color: #f6f6f6;">
                <h1 class="title">โครงการพิเศษ</h1>
                <div class="column is-3">
                <router-link to="/companyAddProgram">
                  <button class="button is-success mb-4">เพิ่มโครงการพิเศษ</button>
                </router-link>
              </div>
              <div class="program-card" v-for="program, index in programs" :key="index">
                <div class="card-content columns is-3">
                  <h1>{{ program.name }}</h1>  
                </div>    
                <div class="columns">
                  <div >     
                    <img :src="program.image" alt="Program Image" />
                  </div>
                  <div class="media-content" @click="viewProgram(program.id)"> 
                    <div class="columns is-3 is-multiline ml-6 mt-1 ">
                      <p >คำอธิบาย: {{ program.description }}</p>
                      <p>คอร์สเรียน: {{ program.course }}</p>
                      <p>ตำแหน่งงาน: {{ program.jobs_title.join(', ') }}</p>
                      <p>คุณสมบัติ: {{ program.qualifications.join(', ') }}</p>
                      <p>สิทธิประโยชน์: {{ program.privileges.join(', ') }}</p>
                    </div>
                    <div class="media-right ml-6 mt-1">
                      <router-link :to="'/companyEditProgram/' + program.id">
                        <button class="button is-small is-info">แก้ไขโครงการ</button>
                      </router-link>
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
  </div>
</template>
<script lang="ts">
import 'bulma/css/bulma.css';
import { defineComponent, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Program from '@/models/Program';

export default defineComponent({
  name: 'CompanyProgramPage',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const programs = reactive<Program[]>([])
    onMounted(() => {
      console.log('get api program by company_id: ' + route.params.id);
      let get_programs: Program[] = [
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
          image: "https://www.w3schools.com/w3images/workbench.jpg", // เพิ่ม URL ของรูปภาพโครงการ
        },
        // โครงการพิเศษอื่น ๆ
    ];
    get_programs.forEach(program => {
        programs.push(program);
    });
    });
    const viewProgram = (id: number) => {
      router.push("/companyEditProgram/" + id)
    }
    return {
      router,
      route,
      programs,
      viewProgram,
      activeTab: 'programs',
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
.program-card {
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(117, 0, 0, 0.1);
  margin-bottom: 1rem;
  background-color: #ffffff;
}
.card {
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 2rem;
  margin-bottom: 1rem;
}

</style>