<template>
  <preloadingVue v-if="store.state.isLoadingData"></preloadingVue>
  <div class="company p-3" v-if="!isAddingProgram && !isEditProgram">
    <div class="columns">
      <div class="column is-3" style="background-color: #f8f8f8; ">
        <aside class="menu">
          <p class="menu-label">Navigation</p>
          <ul class="menu-list">
            <li><router-link :class="{ 'is-active': activeTab === 'info' }" @click="setActiveTab('info')"
                to="/companyProfile">ข้อมูลบริษัท</router-link></li>
            <li><router-link :class="{ 'is-active': activeTab === 'jobs' }" @click="setActiveTab('jobs')"
                to="/companyJob">งานที่ประกาศ</router-link></li>
            <li><router-link :class="{ 'is-active': activeTab === 'programs' }" @click="setActiveTab('programs')"
                to="/companyProgram">โครงการพิเศษ</router-link></li>
          </ul>
        </aside>
      </div>
      <div class="card-container column is-9">
        <div class="card" style="min-height: 100vh;">
          <div class="card-content">
            <div class="content">
              <div v-show="activeTab === 'programs'">
                <div class="head-content">
                  <button class="button is-success" @click="isAddingProgram = true">
                    เพิ่มโครงการพิเศษ
                  </button>
                  <h1 class="title">โครงการพิเศษ</h1>
                </div>
                <div class="program-card" v-for="(program, index) in programs" :key="index">
                  <div class="job-detail">
                    <p class="is-size-4 has-text-weight-bold">{{ index + 1 }} {{ program.name }}</p>
                    <div class="columns">
                      <div class="column is-4">
                        <div class="program-image image is-2by1">
                          <img :src="program.image" alt="Program Image" />
                        </div>
                      </div>
                      <div class="column is-8">
                        
                        <p class="job-detai-text">คอร์สเรียน: {{ program.course }}</p>
                        <p class="job-detai-text">ตำแหน่งงาน: {{ program.jobs_title.toString().replace(/[\[\]"']+/g,'') }}</p>
                        <p class="job-detai-text">คำอธิบาย: {{ program.description }}</p>
                        <p class="job-detai-text">คุณสมบัติ: {{ program.qualifications.toString().replace(/[\[\]"']+/g,'') }}</p>
                        <p class="job-detai-text">สิทธิประโยชน์: {{ program.privileges.toString().replace(/[\[\]"']+/g,'') }}</p>

                       

                        <v-switch v-model="program.state" hide-details inset color="success" :true-value="ProgramStatus.Open"
                          :false-value="ProgramStatus.Closed" :label="`สถานะงาน: ${program.state}`"
                          :style="{ color:  programStateColor(program.state) }" @change="updateProgramState(program.id, program.state)">
                        </v-switch>
                        <button class="button is-small is-info" @click="updateEdit(program, index); isEditProgram = true">แก้ไขงาน</button>
                   
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
  <CompanyAddProgram 
    :company_id="company.id"
    :company_name="company.name"
    v-if="isAddingProgram"
    @addNewProgram="($event) => { isAddingProgram = $event }" @saveNewProgram=" updateNewProgram($event)" >
    
  </CompanyAddProgram>

  <CompanyEditProgramPage 
  v-if="isEditProgram && selectedProgram" 
  :key="selectedProgram.id"
  :id="selectedProgram.id"
  :company_id="selectedProgram.company_id"
  :company_name="selectedProgram.company_name"
  :image="selectedProgram.image"
  :name="selectedProgram.name"
  :description="selectedProgram.description"
  :course="selectedProgram.course"
  :jobs_title="selectedProgram.jobs_title"
  :qualifications="selectedProgram.qualifications"
  :privileges="selectedProgram.privileges"
  :state="selectedProgram.state"

  @updateProgramEdit="
      ($event) => {
        isEditProgram = $event;
      }
    "
    @saveProgramEdit="updateCompanyProgram($event)"
    @programDeleted="updateDelprogram($event)">

   </CompanyEditProgramPage>

</template>
<script lang="ts">
import 'bulma/css/bulma.css';
import { defineComponent, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {ProgramStatus} from '@/models/Program2';
import Swal from 'sweetalert2';
import Program from '@/models/Program';
import { useStore } from 'vuex';
import User from '@/models/User';
import Company from '@/models/Company';
import axios from '@/plugins/axios';
import { PORT } from '@/port';
import { def_company } from "@/plugins/defaultValue";
import preloadingVue from '@/components/pre-loading.vue'
import CompanyAddProgram from "@/components/company-addprogram.vue";
import CompanyEditProgramPage from "@/components/company-editprogram.vue";
export default defineComponent({
  components: {
    CompanyAddProgram,
    CompanyEditProgramPage,
    preloadingVue,
  },
  data: () => ({
    model: "no",
    isAddingProgram: false,
    isEditProgram: false,
    selectedProgramIndex: -1,
  }),
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const user = reactive<User>(store.state.user)

    const company = reactive<Company>(def_company);
    const programs = reactive<Program[]>([])

    onMounted(async() => {
      if (!localStorage.getItem('token')) {
        router.push('/signIn')
        return
      }
      store.commit('LOADING_DATA', true)
      
      await axios.get(`${PORT}` + "/user/getData").then(res => {
        console.log(res.data.user)
        store.commit('SET_USER', res.data.user)
      })
      await axios.get(`${PORT}` + "/company/getProfile/" + user.id).then(res => {
        console.log(res.data.company)
        Object.assign(company, res.data.company);
      })
      
      await axios.get(`${PORT}` + "/company/getProgram/" + user.id).then(res => {
        console.log(res.data.program)
        Object.assign(programs, res.data.program)
      })

      store.commit('LOADING_DATA', false)
    });
    
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

  const programStateColor = (state: string) => {
      return state === "on" ? "green" : "red";
    };

    const updateNewProgram = (change_data: Program) => {
      programs.push(change_data);
    }
    const updateCompanyProgram = (updatedProgram: Program) => {
      const index = programs.findIndex((program) => program.id === updatedProgram.id);
      if (index !== -1) {
        programs[index] = updatedProgram;
      }
    }
    const updateDelprogram = (program_id: string) => {
      const index = programs.findIndex((program) => program.id === program_id);
      if (index !== -1) {
        programs.splice(index, 1);
      }
    };
  
    return {
      router,
      route,
      company,
      programs,
      activeTab: 'programs',
      ProgramStatus,
      deleteForm,
      programStateColor,
      updateCompanyProgram,
      user,
      store,
      updateNewProgram,
      updateDelprogram
    }
  },
  computed: {
  selectedProgram() {
    return this.selectedProgramIndex >= 0 ? this.programs[this.selectedProgramIndex] : null;
  },
},
  methods: {
    setActiveTab(tab: string) {
      this.activeTab = tab;
    },
    updateEdit(job: Program, index: number) {
    // Store the selected job index
    this.selectedProgramIndex = index;
   },
   handleJobDeleted(jobId: string) {
    const index = this.programs.findIndex((program) => program.id === jobId);
    if (index !== -1) {
      this.programs.splice(index, 1);
    }
  },

  async updateProgramState(id: string, newState: string) {
      const stateText = newState === ProgramStatus.Open ? "เปิดรับสมัคร" : "ปิดรับสมัคร";
      try {
        await axios.post(`${PORT}/company/setProgramState`, {
          id: id,
          state: stateText,
        });
        Swal.fire({
          title: "Success",
          text: "Program state updated successfully",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to update the job state",
          icon: "error",
        });
        console.error(error);
      }
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