<template>
  <div class="company p-3">
    <div class="columns">
      <div class="column is-3" style="background-color: #f8f8f8"></div>
      <div class="column is-9" style="background-color: #f1f1f1">
        <div class="card" style="min-height: 100vh">
          <div class="card-content">
            <div class="content">
              <div v-show="activeTab === 'jobs'" style="background-color: #f6f6f6">
                <h1 class="title">เพิ่มประกาศงาน</h1>
                <div class="field">
                  <label class="label">ชื่องาน</label>
                  <div class="control">
                    <input class="input" type="text" v-model="job.name" />
                  </div>
                </div>
                <div class="field">
                  <label class="label">รายละเอียด</label>
                  <div class="control">
                    <input class="input" type="text" v-model="job.detail" />
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
                  <label class="label">คุณสมบัติ</label>
                  <div class="control">
                    <input class="input" type="text" v-model="job.qualifications" />
                  </div>
                </div>

                <div class="field">
                  <label class="label">ติดต่อ</label>
                  <div class="control">
                    <input class="input" type="text" v-model="job.contact.name" placeholder="ชื่อผู้ติดต่อ" />
                  </div>
                  <div class="control mt-2">
                    <input class="input" type="email" v-model="job.contact.email" placeholder="อีเมล์" />
                  </div>
                  <div class="control mt-2">
                    <input class="input" type="text" v-model="job.contact.phone" placeholder="เบอร์โทรศัพท์" />
                  </div>
                </div>
                <div class="field is-grouped">
                  <div class="control">
                    <button class="button is-link" @click="saveJob">
                      บันทึก
                    </button>
                  </div>
                  <div class="control">
                    <button class="button is-link is-light" @click="cancel">
                      ยกเลิก
                    </button>
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
import { defineComponent, reactive } from "vue";
import Swal from "sweetalert2";
import Job from "@/models/Job";
import axios from "@/plugins/axios";
import { PORT } from "@/port";
export default defineComponent({
  emits: ["addNewJob", "saveNewJob"],
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
  setup(props, { emit }) {
    // const router = useRouter();

    const job = reactive<Job>({
      id: "",
      company_id: props.company_id,
      company_name: props.company_name,
      name: "",
      salary_per_day: 0,
      location: "",
      capacity: 0,
      detail: "",
      interview: "",
      qualifications: [],
      contact: { name: "", email: "", phone: "" },
      creation_date: "",
      state: "",
    });

    console.log('ไอดีcompany' + props.company_id)

    const addJob = async () => {
      try {
        await axios.post(`${PORT}/company/addJob`, job);
        Swal.fire({
          title: "Success",
          text: "Job added successfully",
          icon: "success",
        });
        emit("saveNewJob", job);
        emit("addNewJob", false);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to add the job",
          icon: "error",
        });
        console.error(error);
      }
    };

    const saveJob = async () => {
      const result = await Swal.fire({
        title: "ยืนยันการบันทึก?",
        text: "คุณต้องการบันทึกข้อมูลการแก้ไขหรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      });

      if (result.isConfirmed) {
        console.log("Save updated job data:", job);
        await addJob();
      }
    };

    const cancel = async () => {
      emit("addNewJob", false);
    };

    return {
      job,
      saveJob,
      cancel,
      activeTab: "jobs",
    };
  },
  methods: {
    setActiveTab(tab: string) {
      this.activeTab = tab;
    },
  },
});
</script>
  