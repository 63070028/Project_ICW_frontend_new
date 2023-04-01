<template>
  <div class="company p-3">
    <div class="columns" >
      <div class="column is-3" style="background-color: #f8f8f8; ">
        <aside class="menu">
          <p class="menu-label">Navigation</p>
          <ul class="menu-list">
            <li><router-link :class="{ 'is-active': activeTab === 'info' }" @click="setActiveTab('info')" to="/companyProfile/1">ข้อมูลบริษัท</router-link></li>
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

                <div class="program-card" v-for="program, index in programs" :key="index">
                  <div class="columns">
                    <div class="column is-11" @click="viewProgram(program.id)">
                      <p class="is-size-4 has-text-weight-bold">{{ index + 1 }}. {{ program.name }}</p>
                      <div class="columns is-multiline ml-6 mt-1">
                        <p class="column is-6">ระยะเวลาโครงการ: {{ program.duration }}</p>
                        <p class="column is-6">หมวดหมู่: {{ program.category }}</p>
                        <p class="column is-6">สถานที่: {{ program.location }}</p>
                        <p class="column is-6">ค่าตอบแทน: {{ program.description }}</p>
                      </div>
                  </div>
                  <div class="column is-1">
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

      // let get_programs = [
      //   { id: 1, company_id: 1, name: "โครงการฝึกอบรม AI", duration: "3 เดือน", category: "เทคโนโลยีสารสนเทศ", location: "กรุงเทพมหานคร", description: "ค่าตอบแทน 500 ต่อวัน" },
      //   { id: 2, company_id: 1, name: "โครงการพัฒนาแอพพลิเคชั่น", duration: "6 เดือน", category: "เทคโนโลยีสารสนเทศ", location: "กรุงเทพมหานคร", description: "ค่าตอบแทน 500 ต่อวัน" },
      //   { id: 3, company_id: 1, name: "โครงการสัมมนา Data Science", duration: "1 สัปดาห์", category: "วิทยาศาสตร์ข้อมูล", location: "กรุงเทพมหานคร", description: "ค่าตอบแทน 500 ต่อวัน" },
      // ]

      // get_programs.forEach(program => {
      //   programs.push(program)
      // });

    });

    const viewProgram = (id: number) => {
      router.push("/programs/" + id)
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  background-color: #ffffff;
}
</style>