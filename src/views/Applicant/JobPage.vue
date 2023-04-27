<template>
  <preloadingVue v-if="store.state.isLoadingData"></preloadingVue>
  <div class="container mt-4" v-if="!store.state.isLoadingData">
    <div class="has-background-light box mt-3 pl-3 pr-4 pt-4 pb-4">
      <p class="has-text-right">{{ job.creation_date }}</p>
      <div class="columns mt-1">
        <div class="column is-11">
          <p class="is-size-3 has-text-weight-bold p-4"><b>บริษัท {{ job.company_name }}</b></p>
          <p class="is-size-5 p-4">
            <b>{{ job.name }}</b>
          </p>
          <div class="pl-3">
            <div class="p-4">
              <i class="pi pi-map-marker">
                <span class="is-size-5 pl-4"><b>สถานที่ทำงาน: </b>{{ job.location }}</span></i>
            </div>
            <div class="p-4">
              <i class="pi pi-dollar">
                <span class="is-size-5 pl-4"><b>ค่าตอบแทนรายวัน: </b>{{ job.location }}</span></i>
            </div>
            <div class="p-4">
              <i class="pi pi-user"><span class="is-size-5 pl-4"><b>จำนวนคำที่รับ: </b>{{ job.capacity }}</span></i>
            </div>
            <p class="is-size-5 p-4">
              <b>รูปแบบการสัมภาษณ์: </b>{{ job.interview }}
            </p>
          </div>
        </div>
        <div class="column my-3" style="display: flex;flex-direction: column;justify-content: space-between;">
          <button v-if="user.role === 'applicant'" class="button is-danger" @click="isReport = !isReport">
            รายงาน
          </button>
          <button class="button is-success" @click="submitApplication()" v-if="user.role == 'applicant'">
            ยื่นสมัคร
          </button>
        </div>
      </div>
    </div>
    <div v-if="user.role === 'applicant'" style="display: flex; flex-direction: column; align-items: flex-end">
      <i v-show="isMyFavorite == false" class="pi pi-heart m-5" style="font-size: 1.3rem; cursor: pointer"
        @click="setMyJobFavorite()"><span class="ml-2">รายการโปรด</span></i>

      <i v-show="isMyFavorite == true" class="pi pi-heart-fill m-5"
        style="color: #e41a50; font-size: 1.3rem; cursor: pointer" @click="setMyJobFavorite()"><span class="ml-2"
          style="color: black">รายการโปรด</span></i>
    </div>
    <div class="p-5">
      <p class="is-size-5 has-text-weight-semibold mt-6">รายละเอียดงาน</p>
      <p>{{ job.detail }}</p>
      <p class="is-size-5 has-text-weight-semibold mt-6">คุณสมบัติผู้สมัคร</p>
      <ul>
        <li v-for="(qualification, index) in job.qualifications" :key="index">
          {{ index + 1 + ". " }} {{ qualification }}
        </li>
      </ul>
      <p class="is-size-5 has-text-weight-semibold mt-6">ช่องทางติดต่อ</p>
      <p>{{ job.contact.name }}</p>
      <p>email: {{ job.contact.email }}</p>
      <p>เบอร์ติดต่อ: {{ job.contact.phone }}</p>
    </div>
  </div>

  <div :class="['modal', isReport ? 'is-active' : '']">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">แจ้งความผิดปกติไปให้ผู้ดูแลระบบ</p>
        <button class="delete" aria-label="close" @click="isReport = !isReport"></button>
      </header>
      <section class="modal-card-body">
        <div class="control">
          <textarea class="textarea" v-model="v$.messageReport.$model"></textarea>
          <div class="has-text-danger" v-for="error of v$.messageReport.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="submitReport()">
          Submit
        </button>
        <button class="button" @click="isReport = !isReport">Cancel</button>
      </footer>
    </div>
  </div>
</template>



<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Job from "@/models/Job";
import "primeicons/primeicons.css";
import Swal from "sweetalert2";
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import JobReportModel from "@/models/formModels/JobReportModel";
import axios from "@/plugins/axios";
import { PORT } from "@/port";
import User from "@/models/User";
import { useStore } from "vuex";
import ApplicationJobModel from "@/models/formModels/ApplicationJobModel";
import Applicant from "@/models/Applicant";
import preloadingVue from "@/components/pre-loading.vue";
import JobFavoriteModel from "@/models/formModels/JobFavoriteModel"
import getUserData from "@/plugins/getUser";
import {
  def_job,
  def_applicant,
  def_formApplicationJob,
  def_formReport,
  def_JobFavorit
} from "@/plugins/defaultValue";


export default defineComponent({
  components: {
    preloadingVue
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const v$ = useVuelidate();
    const store = useStore();
    const user = reactive<User>(store.state.user)

    const job = reactive<Job>(def_job);
    const formReportSend = reactive<JobReportModel>(def_formReport);
    const applicant = reactive<Applicant>(def_applicant)
    const formApplicationJob = reactive<ApplicationJobModel>(def_formApplicationJob)

    const setJobFavorite = reactive<JobFavoriteModel>(def_JobFavorit)


    const isMyFavorite = ref<boolean>(false);
    const isReport = ref<boolean>(false);
    const messageReport = ref<string>("");

    const setMyJobFavorite = () => {
      isMyFavorite.value = !isMyFavorite.value;
      if (isMyFavorite.value == true) {
        setJobFavorite.applicant_id = applicant.id
        setJobFavorite.job_id = job.id
        axios.post(`${PORT}` + "/applicant/saveMyJobFavorite", setJobFavorite)

      } else {
        setJobFavorite.applicant_id = applicant.id
        setJobFavorite.job_id = job.id
        axios.post(`${PORT}` + "/applicant/removeMyJobFavorite", setJobFavorite)
      }

    };

    const submitApplication = async () => {
      if (applicant.state == '') {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "คุณยังไม่ได้ลงประวัติ",
          showConfirmButton: false,
          timer: 1500,
        });
        return
      }


      Swal.fire({
        title: "Are you sure?",
        text: "คุณแน่ใจแล้วใช่ไหมที่จะยืนใบสมัคร",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "hsl(141, 50%, 48%)",
        cancelButtonColor: "hsl(348, 100%, 61%)",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {


          formApplicationJob.applicant_id = applicant.id
          formApplicationJob.company_name = job.company_name
          formApplicationJob.company_id = job.company_id
          formApplicationJob.job_name = job.name
          formApplicationJob.job_id = job.id
          formApplicationJob.firstName = applicant.firstName
          formApplicationJob.lastName = applicant.lastName
          formApplicationJob.email_profile = applicant.email_profile
          formApplicationJob.birthDate = applicant.birthDate
          formApplicationJob.gender = applicant.gender
          formApplicationJob.address = applicant.address
          formApplicationJob.phone = applicant.phone
          formApplicationJob.resume = applicant.resume
          formApplicationJob.transcript = applicant.transcript
          formApplicationJob.portfolio = applicant.portfolio
          formApplicationJob.creation_date = new Date().toLocaleDateString("en-US")
          formApplicationJob.state = "pending"

          const swalWaiting: any = Swal.fire({
            position: 'center',
            title: 'Uploading...',
            showConfirmButton: false,
            didOpen: () => {
              Swal.showLoading()
            }
          })

          await axios.post(`${PORT}` + "/application/sendApplicationJob", formApplicationJob).then(res => {
            console.log(res.data.message)
            swalWaiting.close();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "ดำเนิดการสำเร็จ",
              showConfirmButton: false,
              timer: 1500,
            });
          });

        }
      });
    };

    const submitReport = async () => {
      const isFormCorrect = await v$.value.$validate();
      if (!isFormCorrect) return;

      formReportSend.user_id = user.id
      formReportSend.company_name = job.company_name
      formReportSend.company_id = job.company_id
      formReportSend.job_id = "" + route.params.id
      formReportSend.job_name = job.name
      formReportSend.message = messageReport.value
      formReportSend.creation_date = new Date().toLocaleDateString("en-US")

      console.log(formReportSend.creation_date);
      const swalWaiting: any = Swal.fire({
        position: 'center',
        title: 'Uploading...',
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading()
        }
      })
      await axios
        .post(`${PORT}` + "/applicant/sendReport", formReportSend)
        .then((response) => {
          console.log(response.data.message);
          swalWaiting.close()
          Swal.fire({
            position: "center",
            icon: "success",
            title: "ดำเนินการสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });
          messageReport.value = "";
          isReport.value = !isReport.value;
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    };

    onMounted(async () => {
      //get api job

      store.commit('LOADING_DATA', true)
      await getUserData();
      if (store.state.user.role === "applicant") {
        await axios.get(`${PORT}` + "/applicant/getProfileById/" + user.id).then(res => Object.assign(applicant, res.data.applicant))
      }

      await axios.post(`${PORT}` + "/company/getJobById", { job_id: route.params.id, applicant_id: user.id }).then((res) => {
        Object.assign(job, res.data.job)
        isMyFavorite.value = res.data.isJobFavorite;
      })

      store.commit('LOADING_DATA', false)

    });

    return {
      router,
      route,
      v$,
      job,
      isMyFavorite,
      isReport,
      messageReport,
      setMyJobFavorite,
      submitApplication,
      submitReport,
      formReportSend,
      store,
      user,
      applicant,
      formApplicationJob,
      setJobFavorite
    };
  },
  validations() {
    return {
      messageReport: {
        required: helpers.withMessage("กรุณากรอกข้อความ", required),
      },
    };
  },
});

</script>
