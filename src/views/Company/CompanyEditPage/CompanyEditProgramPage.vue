<template>
  <div class="company p-3">
    <div class="columns">
      <div class="column is-3" style="background-color: #f8f8f8;">
        <aside class="menu">
          <p class="menu-label">Navigation</p>
          <ul class="menu-list">
            <li><router-link :class="{ 'is-active': activeTab === 'info' }" @click="setActiveTab('info')" to="/companyProfile">ข้อมูลบริษัท</router-link></li>
            <li><router-link :class="{ 'is-active': activeTab === 'jobs' }" @click="setActiveTab('jobs')" to="/companyJob">งานที่ประกาศ</router-link></li>
            <li><router-link :class="{ 'is-active': activeTab === 'programs' }" @click="setActiveTab('programs')" to="/companyProgram">โครงการพิเศษ</router-link></li></ul>
        </aside>
      </div>
      <div class="column is-9" style="background-color: #f1f1f1;">
        <div class="card" style="min-height: 100vh;">
          <div class="card-content">
            <div class="content">
              <div v-show="activeTab === 'programs'" style="background-color: #f6f6f6;">
                <h1 class="title">แก้ไขโครงการพิเศษ</h1>

                <div class="field is-grouped">
                <div class="control">
                    <button class="button is-link is-danger" @click="deleteForm">ลบโครงการ</button>
                </div>
              </div>
                  <div class="field">
                        <label class="label">อัพโหลดรูปภาพโครงการ</label>
                        <div class="file ">
                        <label class="file-label">
                            <input class="file-input" type="file"   @change="previewProgramImage">
                            <span class="file-cta is-small">
                                <span class="file-label">
                                    Choose a file..
                                </span>
                            </span>
                        </label>
                    </div>
                    </div>
                    <div  >
                      <img v-if="programImagePreview" :src="programImagePreview" class="program_image image-is2by1" />
                    </div>
                <div class="field">
                  <label class="label">ชื่อโครงการ</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="ชื่อโครงการ" v-model="program.name" />
                  </div>
               </div>

                <div class="field">
                  <label class="label">คอร์สเรียน</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="คอร์สเรียน" v-model="program.course" />
                  </div>
                </div>

                <div class="field">
                  <label class="label">ตำแหน่งงาน</label>
                  <div>
                    <div class="control">
                      <input class="input" type="text" placeholder="ตำแหน่งงาน" v-model="program.jobs_title" />
                    </div>
                  </div>

                  <div class="field">
                    <label class="label">รายละเอียด</label>
                    <div class="control">
                      <textarea class="textarea" placeholder="รายละเอียดของโครงการพิเศษ"
                        v-model="program.description"></textarea>
                    </div>
                  </div>

                  <div class="field">
                    <label class="label">คุณสมบัติ</label>
                    <div class="control">
                      <textarea class="textarea" placeholder="คุณสมบัติ"
                        v-model="program.qualifications"></textarea>
                    </div>
                  </div>

                  <div class="field">
                    <label class="label">สิทธิประโยชน์</label>
                    <div class="control">
                      <textarea class="textarea" placeholder="สิทธิประโยชน์"
                        v-model="program.privileges"></textarea>
                    </div>
                  </div>
                  
                  <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-link" @click="submitForm">บันทึก</button>
                    </div>
                    <div class="control">
                        <button class="button is-link is-light" @click="cancelForm">ยกเลิก</button>
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
import { defineComponent, onMounted, reactive ,ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Program from '@/models/Program';
import Swal from 'sweetalert2';

export default defineComponent({
  name: 'CompanyEditProgramPage',

  setup() {
    const router = useRouter();
    const route = useRoute();

    const program = reactive<Program>({
      id: "0",
      company_id: "0",
      company_name:"",
      name: "",
      description: "", // เพิ่มคุณสมบัติ description
      course: "",
      jobs_title: [],
      qualifications: [],
      privileges: [],
      image:'https://images.unsplash.com/photo-1535551951406-a19828b0a76b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1166&q=80',
      state:""
    });
    const programImageInput = ref(null);
    const programImagePreview = ref('https://www.w3schools.com/w3images/workbench.jpg');
    onMounted(() => {
      console.log('get api program id: ' + route.params.id);

      // const get_program = {
      //   id: 1,
      //   name: 'โครงการพิเศษ 1',
      //   duration: '1 เดือน',
      //   category: 'การพัฒนาซอฟต์แวร์',
      //   location: 'กรุงเทพมหานคร',
      //   description: 'รายละเอียดของโครงการพิเศษ 1',
      // };
      // Object.assign(program, get_program);

    });
    const onFileChange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          program.image = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    };
    const submitForm = async () => {
      // ตรวจสอบความถูกต้องของข้อมูลก่อนส่ง
      if (!program.image || !program.name || !program.description || !program.course) {
        Swal.fire('กรุณากรอกข้อมูลให้ครบถ้วน', 'ข้อมูลไม่สมบูรณ์ กรุณากรอกข้อมูลให้ครบถ้วน', 'warning');
        return;
      }

      // ส่งข้อมูลไปยัง API เพื่อบันทึก
      try {
        // await saveProgram(program);
        Swal.fire('บันทึกเรียบร้อย!', 'โครงการพิเศษถูกแก้ไขแล้ว', 'success');
    router.push('/companyProgram');
  } catch (error) {
    Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถแก้ไขโครงการพิเศษได้', 'error');
  }
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
  
    const updateProgram = () => {
      console.log('update api program id: ' + route.params.id);
      console.log('updated program:', program);
      router.push('/companyProgram');
    };

  const cancelForm = () => {
    router.push('/companyProgram');
  };
  const previewProgramImage = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        programImagePreview.value = URL.createObjectURL(file);
      }
    };
    return {
      router,
      route,
      program,
      updateProgram,
      activeTab: 'programs',
      submitForm,
      cancelForm,
      deleteForm,
      onFileChange,
      programImageInput,
      previewProgramImage,
      programImagePreview
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
.program-card {
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  background-color: #ffffff;
}
.program_image {
  width: 30%;
  height: 50%;
  }
</style>