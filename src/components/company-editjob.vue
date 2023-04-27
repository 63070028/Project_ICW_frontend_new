<template>
  <div class="company p-3">
    <div class="columns" style="background-color: #f0ede9">
      <div class="column is-2" style="background-color: #f0ede9"></div>
      <div class="column is-9" style="background-color: #f0ede9">
        <div class="card" style="min-height: 100vh">
          <div class="card-content">
            <div class="content">
              <div class="company-edit-job">
                <div class="column is-12">
                  <h1 class="title">แก้ไขงาน</h1>
                  <div class="field is-grouped">
                    <div class="control">
                      <button
                        class="button is-link is-danger"
                        @click="deleteForm"
                      >
                        ลบงาน
                      </button>
                    </div>
                  </div>

                  <div class="field">
                    <label class="label">ชื่องาน</label>
                    <div class="control">
                      <input class="input" type="text" v-model="job.name" />
                    </div>
                    <div class="field">
                      <label class="label">รายละเอียด</label>
                      <div class="control">
                        <input class="input" type="text" v-model="job.detail" />
                      </div>
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
                      <input
                        class="input"
                        type="text"
                        v-model="job.salary_per_day"
                      />
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">รูปแบบการสัมภาษณ์</label>
                    <div class="control">
                      <div class="control">
                        <label class="radio">
                          <input
                            type="radio"
                            name="answer"
                            value="ออนไลน์"
                            v-model="job.interview"
                          />
                          ออนไลน์
                        </label>
                        <label class="radio">
                          <input
                            type="radio"
                            name="answer"
                            value="ออนไซต์"
                            v-model="job.interview"
                          />
                          ออนไซต์
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">จำนวนที่รับ</label>
                    <div class="control">
                      <input class="input" type="text" v-model="job.capacity" />
                    </div>
                  </div>

                  <label class="label">คุณสมบัติ</label>
                  <div class="field is-grouped">
                    <p class="control">
                      <input
                        placeholder="เพิ่มคุณสมบัติ"
                        class="input"
                        type="text"
                        v-model="qualification"
                      />
                    </p>
                    <p class="control">
                      <button
                        class="button is-success"
                        @click="job.qualifications.push(qualification)"
                      >
                        add
                      </button>
                    </p>
                  </div>
                  <div
                    class="formInput columns control my-1"
                    v-for="(qualification, index) in job.qualifications"
                    :key="index"
                  >
                    <p class="form-detail">{{ qualification }}</p>
                    <button
                      class="button is-danger"
                      @click="job.qualifications.splice(index, 1)"
                    >
                      x
                    </button>
                  </div>
                  <div class="field">
                    <label class="label">ติดต่อ</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="job.contact.name"
                        placeholder="ชื่อผู้ติดต่อ"
                      />
                    </div>
                    <div class="control mt-2">
                      <input
                        class="input"
                        type="email"
                        v-model="job.contact.email"
                        placeholder="อีเมล"
                      />
                    </div>
                    <div class="control mt-2">
                      <input
                        class="input"
                        type="text"
                        v-model="job.contact.phone"
                        placeholder="เบอร์โทรศัพท์"
                      />
                    </div>
                  </div>

                  <div class="field">
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
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Job from "@/models/Job";
import Swal from "sweetalert2";
import { PORT } from "@/port";
import axios from "axios";

export default defineComponent({
  emits: ["updateJobEdit", "saveJobEdit", "jobDeleted"],
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
      type: Object as PropType<{ name: string; email: string; phone: string }>,
      required: true,
    },
    creation_date: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const qualification = ref<string>("");
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
    const editForm = reactive<Job>({
      id: "",
      company_id: "",
      name: "",
      company_name: "",
      salary_per_day: 0,
      capacity: 0,
      location: "",
      detail: "",
      interview: "",
      qualifications: [],
      contact: { name: "", email: "", phone: "" },
      creation_date: "",
      state: "",
    });

    const saveJob = async () => {
      Swal.fire({
        position: "center",
        title: "",
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        Object.assign(editForm, job);
        await axios
          .post(`${PORT}` + "/company/editjob", editForm)
          .then((res) => {
            console.log(res.data.message);
            emit("saveJobEdit", job);
            emit("updateJobEdit", false);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Success",
              showConfirmButton: false,
              timer: 1000,
            });
          });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to update company profile",
          icon: "error",
        });
      }
    };

    const deleteForm = async () => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "คุณจะไม่สามารถกู้ข้อมูลงานนี้ได้",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      });

      if (result.isConfirmed) {
        try {
          const jobId = job.id;
          const response = await axios.delete(
            `${PORT}` + "/company/deleteJob",
            {
              params: {
                jobId: jobId,
              },
            }
          );
          if (response.status === 200) {
            emit("jobDeleted", job.id); // อัพเดตข้อมูลงาน
            emit("updateJobEdit", false);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Success",
              showConfirmButton: false,
              timer: 1000,
            });
          } else {
            Swal.fire(
              "Error",
              "เกิดข้อผิดพลาดในการลบงาน กรุณาลองใหม่.",
              "error"
            );
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "เกิดข้อผิดพลาดในการลบงาน กรุณาลองใหม่.", "error");
        }
      } else {
        Swal.fire("Cancelled", "ยกเลิกแล้ว :)", "error");
      }
    };

    const cancel = async () => {
      emit("updateJobEdit", false);
    };
    return {
      job,
      saveJob,
      cancel,
      deleteForm,
      router,
      activeTab: "jobs",
      qualification,
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
.card-container {
  background-color: #e9e9e9;
}
.card-content {
  background-color: #f0ede9;
}
.head-content {
  padding: 1rem;
}
.label {
  font-size: 1.2rem;
  font-weight: bold;
}
.button.is-success {
  color: white;
  border: none;
  border-radius: 5px;
}
.input {
  background-color: #ffffff;
  border: none;
  border-bottom: 2px;
}
.formInput {
  border-radius: 5px;
}
.formInput p {
  background-color: #ddccb4;
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
  margin-left: 10px;
}
button,
input {
  display: inline-block;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
