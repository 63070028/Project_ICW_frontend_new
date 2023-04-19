<template>
    <div class="company p-3">
      <div class="columns">
        <div class="column is-3" style="background-color: #f8f8f8;">
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
import { defineComponent, onMounted, PropType, reactive } from 'vue';
import { useRouter } from 'vue-router';
import Job from '@/models/Job';
import Swal from 'sweetalert2';
import { PORT } from "@/port";
import axios from "axios";

export default defineComponent({
emits: ["updateJobEdit", "saveEdit"],
props: {
    id: {
      type: String,
      required: true,
    },
    company_id: {
      type: String,
      required: true,
    },
    company_name: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    salary_per_day: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    interview: {
      type: String,
      required: true,
    },
    qualifications: {
      type: Array as PropType<string[]>,
      required: true,
    },
    contact: {
      type: Object as PropType<{name: string, email: string, phone: string}>,
      required: true,
      default: () => {
        return {
          name: '',
          email: '',
          phone: '',
        };
      },
    },
    creation_date: {
      type: String,
      required: true,
      default: () => new Date().toISOString().substring(0, 10),
    },
    state: {
      type: String,
      required: true,
      default: 'open',
    },
  },

  setup(props, {emit}) {
    const router = useRouter();
    const job = reactive<Job>({
      id: props.id,
      company_id: props.company_id,
      company_name: props.company_name,
      name: props.name,
      salary_per_day: props.salary_per_day,
      location: props.location,
      capacity: props.capacity,
      detail: props.detail,
      interview: props.interview,
      qualifications: props.qualifications,
      contact: props.contact,
      creation_date: props.creation_date,
      state: props.state,
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
      //router.push('/companyJob');
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
  