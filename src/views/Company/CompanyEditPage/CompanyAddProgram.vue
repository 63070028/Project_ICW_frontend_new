<template>
    <div class="company p-3">
      <div class="columns">
        <div class="column is-3" style="background-color: #f8f8f8;">
          <aside class="menu">
            <p class="menu-label">Navigation</p>
            <ul class="menu-list">
              <li><router-link :class="{ 'is-active': activeTab === 'info' }" @click="setActiveTab('info')" to="/companyProfile">ข้อมูลบริษัท</router-link></li>
              <li><router-link :class="{ 'is-active': activeTab === 'jobs' }" @click="setActiveTab('jobs')" to="/companyJob">งานที่ประกาศ</router-link></li>
              <li><router-link :class="{ 'is-active': activeTab === 'programs' }" @click="setActiveTab('programs')" to="/companyProgram">โครงการพิเศษ</router-link></li>
            </ul>
          </aside>
        </div>
        <div class="column is-9" style="background-color: #f1f1f1;">
          <div class="card" style="min-height: 100vh;">
            <div class="card-content">
              <div class="content">
                <div v-show="activeTab === 'programs'" style="background-color: #f6f6f6;">
                    <h1 class="title">เพิ่มโครงการพิเศษ</h1>
                    <div class="field">
                        <label class="label">อัพโหลดรูปภาพโครงการ</label>
                        <input type="file" accept="image/*" @change="onFileChange" />
                    </div>
                    <!-- ฟอร์มข้อมูลโครงการพิเศษ -->
                        <div class="field">
                        <label class="label">ชื่อโครงการ</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="ชื่อโครงการ" v-model="program.name" />
                        </div>
                        </div>

                        <label class="label">ตำแหน่งงาน</label>
                        <div>
                            <div class="control">
                            <input class="input" type="text" placeholder="ตำแหน่งงาน" v-model="program.job_title" />
                            </div>
                        </div>

                        <div class="field">
                        <label class="label">รายละเอียด</label>
                        <div class="control">
                            <textarea class="textarea" placeholder="รายละเอียดของโครงการพิเศษ" v-model="program.description"></textarea>
                        </div>
                        </div>

                        <div class="field">
                            <label class="label">หลักสูตร</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="หลักสูตร" v-model="program.course" />
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
                    <div class="field">
                        <div class="control">
                            <button class="button is-primary" @click="submitForm">บันทึก</button>
                            <button class="button is-danger" @click="cancelForm">ยกเลิก</button>
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
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import Program from '@/models/Program';

export default defineComponent({
  setup() {
    const router = useRouter();
    const program = reactive<Program>({
      id: 0,
      company_id: 0,
      image: '',
      name: '',
      description: '',
      course: '',
      job_title: [],
      qualifications: [],
      privileges: [],
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
        Swal.fire('บันทึกเรียบร้อย!', 'โครงการพิเศษถูกเพิ่มเรียบร้อยแล้ว', 'success');
    router.push('/companyProgram');
  } catch (error) {
    Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถเพิ่มโครงการพิเศษได้', 'error');
  }
};

const cancelForm = () => {
  router.push('/companyProgram');
};


return {
  program,
  onFileChange,
  submitForm,
  cancelForm,
  activeTab: 'programs',
};
},
methods: {
    setActiveTab(tab: string) {
      this.activeTab = tab;
    },
  },
});
</script>