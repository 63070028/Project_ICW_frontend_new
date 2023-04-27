<template>
  <div class="company p-3">
    <div class="columns">
      <div class="column is-3" style="background-color: #f8f8f8;">
      </div>
      <div class="column is-9" style="background-color:#f0ede9;">
        <div class="card" style="min-height: 100vh;">
          <div class="card-content">
            <div class="content">
              <div style="background-color: #f0ede9;">
                <h1 class="title">เพิ่มโครงการพิเศษ</h1>
                <div class="field">
                  <label class="label">อัพโหลดรูปภาพโครงการ</label>
                  <div class="file ">
                    <label class="file-label">
                      <input class="file-input" type="file" @change="previewProgramImage">
                      <span class="file-cta is-small">
                        <span class="file-label">
                          Choose a file..
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
                <div>
                  <img v-if="programImagePreview" :src="programImagePreview" class="program_image image-is2by1" />
                </div>
                <!-- ฟอร์มข้อมูลโครงการพิเศษ -->
                <div class="field">
                  <label class="label">ชื่อโครงการ</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="ชื่อโครงการ" v-model="program.name" />
                  </div>
                </div>
                <div class="qualification">
                  <label class="label">ชื่องาน</label>
                  <button class="button is-success" @click="program.jobs_title.push(job_title)">add</button>
                  <input placeholder="เพิ่ม Job_title" class="input" type="text" v-model="job_title" />
                  <div  class="formInput columns control my-5" v-for="qualification, index in program.jobs_title"
                    :key="index">
                    <p class="form-detail"> {{ qualification }} </p>
                    <button class="button  is-danger " @click="program.jobs_title.splice(index, 1)">x</button>
                  </div>
                </div>

                <div class="qualification">
                  <label class="label">คุณสมบัติ</label>
                  <button class="button is-success" @click="program.qualifications.push(qualification)">add</button>
                  <input placeholder="เพิ่มคุณสมบัติ" class="input" type="text" v-model="qualification" />
                  <div  class="formInput columns control my-5" v-for="qualification, index in program.qualifications"
                    :key="index">
                    <p class="form-detail"> {{ qualification }} </p>
                    <button class="button  is-danger " @click="program.qualifications.splice(index, 1)">x</button>
                  </div>
                </div>


                <div class="qualification">
                  <label class="label">สิทธิพิเศษ</label>
                  <button class="button is-success" @click="program.privileges.push(privilege)">add</button>
                  <input placeholder="เพิ่มสิทธิพิเศษ" class="input" type="text" v-model="privilege" />
                  <div  class="formInput columns control my-5" v-for="qualification, index in program.privileges"
                    :key="index">
                    <p class="form-detail"> {{ qualification }} </p>
                    <button class="button  is-danger " @click="program.privileges.splice(index, 1)">x</button>
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
                  <label class="label">หลักสูตร</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="หลักสูตร" v-model="program.course" />
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
import { defineComponent, reactive, ref } from 'vue';
import Swal from 'sweetalert2';
import Program from '@/models/Program';
import { PORT } from "@/port";
import axios from "axios";
export default defineComponent({
  emits: ["addNewProgram", "saveNewProgram"],
  props: {
    company_id: {
      type: String,
      required: true,
    },
    company_name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      inputs: ['', '', '']
    };
  },
  setup(props, { emit }) {

    const qualification = ref<string>("");
    const job_title =  ref<string>("");
    const privilege =  ref<string>("");
    const program = reactive<Program>({
      id: '',
      company_id: '',
      company_name: '',
      name: '',
      jobs_title: [],
      description: '',
      course: '',
      qualifications: [],
      privileges: [],
      image: '',
      state: ''
    });

    const programImageInput = ref<HTMLInputElement | null>(null);
    const programImagePreview = ref(program.image);

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
      const result = await Swal.fire({
        title: "ยืนยันการบันทึก?",
        text: "คุณต้องการบันทึกข้อมูลการแก้ไขหรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      });
      Swal.fire({
        position: "center",
        title: "Uploading file...",
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      if (result.isConfirmed) {

        const formData = new FormData();
        formData.append('company_id', props.company_id);
        formData.append('company_name', props.company_name);
        formData.append('name', program.name);
        formData.append('jobs_title', JSON.stringify(program.jobs_title));
        formData.append('description', program.description);
        formData.append('course', program.course);
        formData.append('qualifications', JSON.stringify(program.qualifications));
        formData.append('privileges', JSON.stringify(program.privileges));
        formData.append('state', "on")
        if (programImageInput.value && programImageInput.value.files) {
          formData.append('image', programImageInput.value.files[0]);
        }
        try {
          const response = await axios.post(`${PORT}` + "/company/addProgram", formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          program.image = response.data.image
          program.id = response.data.program_id
          Swal.fire('บันทึกเรียบร้อย!', 'โครงการพิเศษถูกเพิ่มเรียบร้อยแล้ว', 'success');

          emit("saveNewProgram", program);
          emit("addNewProgram", false);

        } catch (error) {
          Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถเพิ่มโครงการพิเศษได้', 'error');

        }
      }
    };


    const cancelForm = () => {
      emit("addNewProgram", false);
    };

    const previewProgramImage = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        programImagePreview.value = URL.createObjectURL(file);
        programImageInput.value = event.target as HTMLInputElement;
      }
    };
    return {
      program,
      onFileChange,
      submitForm,
      cancelForm,
      activeTab: 'programs',
      programImageInput,
      previewProgramImage,
      programImagePreview,
      qualification,
      job_title,
      privilege
    };
  },
  methods: {
    setActiveTab(tab: string) {
      this.activeTab = tab;
    },
  },
  addInput() {
    this.inputs.push('');
  }
});
</script>
<style scoped>
.card-container{
  background-color: #e9e9e9;
}
.card-content{
  background-color: #f0ede9
}
.head-content{
  padding: 1rem;
}
.program_image {
  width: 30%;
  height: 50%;
}
.qualification {
  
  font-family: Arial, sans-serif;
  background-color: #f0ede9;
  padding-left: 30px;
  border-radius: 5px;
}
.label {
  
  font-size: 1.2rem;
  font-weight: bold;
}
.button.is-success {

  color: white;
  border: none;
  border-radius: 5px;
  margin-bottom: 20px;}
.input {
 
  background-color: #ffffff;
  border: none;
  border-bottom: 2px;
}
.formInput {
  border-radius: 5px;
}
.formInput p {
  background-color: #BACDDB;
  font-size: 1.1rem;
}
.button.is-danger {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  padding-left: 20px;
  margin-left: 10px;
}

.form-detail {
  border-radius: 5px;
  padding: 8px 30px 7px;
  margin-left:10px ;
  margin-bottom: 10px;
}
</style>