
<template>
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
  <preloadingVue v-if="store.state.isLoadingData"></preloadingVue>
  <div class="w3-light-grey" v-if="!store.state.isLoadingData">
    <div class="w3-content w3-margin-top" style="max-width: 1400px">
      <div class="w3-container w3-card w3-white w3-margin-bottom">
        <div class="columns mt-6">
          <div class="column is-2"></div>
          <div class="tabs is-boxed column is-8">
            <div>
              <div class="column is-11">
                <p class="is-size-4 has-text-weight-bold">
                  ผู้สมัครหมายเลข {{ route.params.id }}
                </p>
                <div class="columns is-multiline ml-6 mt-1">
                  <p class="column is-12 is-size-5 has-text-weight-bold">
                    ชื่อผู้สมัคร: {{ applicationJob.firstName }}
                    {{ applicationJob.lastName }}
                  </p>
                  <p class="column is-6">เพศ: {{ applicationJob.gender }}</p>
                  <p class="column is-6">
                    อีเมล: {{ applicationJob.email_profile }}
                  </p>
                  <p class="column is-6">
                    วัน-เดือน-ปี เกิด: {{ applicationJob.birthDate }}
                  </p>
                  <p class="column is-6">
                    ที่อยู่: {{ applicationJob.address }}
                  </p>
                  <p class="column is-6">
                    เบอร์โทร: {{ applicationJob.phone }}
                  </p>
                  <div class="column is-6">
                    สถานะ: {{ applicationJob.state }}
                  </div>
                  <div class="column is-8"></div>
                  <div class="column is-2">
                    <button
                      style="left: 90%"
                      class="button is-medium is-success"
                      @click="acceptApplicant(applicationJob)"
                    >
                      ผ่าน
                    </button>
                  </div>
                  <div class="column is-2">
                    <button
                      style="left: 75%"
                      class="button is-medium is-danger"
                      @click="declineApplicant(applicationJob)"
                    >
                      ไม่ผ่าน
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <ul>
              <li
                :class="[select_option === 'resume' ? 'is-active' : '']"
                @click="select_option = 'resume'"
              >
                <a>
                  <span>Resume</span>
                </a>
              </li>
              <li
                :class="[select_option === 'transcript' ? 'is-active' : '']"
                @click="select_option = 'transcript'"
              >
                <a>
                  <span>Transcript</span>
                </a>
              </li>
              <li
                :class="[select_option === 'portfolio' ? 'is-active' : '']"
                @click="select_option = 'portfolio'"
              >
                <a>
                  <span>Portfolio</span>
                </a>
              </li>
            </ul>
            <uploadPdfVue
              :maxSize="100"
              :upload_category="select_option"
              v-if="select_option === 'resume'"
              :role="'company'"
              :url="applicationJob.resume"
            >
            </uploadPdfVue>
            <uploadPdfVue
              :maxSize="100"
              :upload_category="select_option"
              v-if="select_option === 'transcript'"
              :role="'company'"
              :url="applicationJob.transcript"
            >
            </uploadPdfVue>
            <uploadPdfVue
              :maxSize="100"
              :upload_category="select_option"
              v-if="select_option === 'portfolio'"
              :role="'company'"
              :url="applicationJob.portfolio"
            >
            </uploadPdfVue>
          </div>

          <div class="column is-2"></div>
        </div>
      </div>
    </div>
  </div>

  <div :class="['modal', confirmDelete ? 'is-active' : '']">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">ต้องการปฏิเสธผู้สมัครรายนี้</p>
        <button
          class="delete"
          aria-label="close"
          @click="confirmDelete = !confirmDelete"
        ></button>
      </header>
      <footer class="modal-card-foot">
        <button class="button is-success">Submit</button>
        <button class="button" @click="confirmDelete = !confirmDelete">
          Cancel
        </button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted} from "vue";
import { useRoute, useRouter } from "vue-router";
import uploadPdfVue from "@/components/upload-pdf.vue";
import ApplicationJob from "@/models/ApplicationJob";
import "primeicons/primeicons.css";
import Swal from "sweetalert2";
import { useVuelidate } from "@vuelidate/core";
import { def_applicationJob } from "@/plugins/defaultValue";
import axios from "@/plugins/axios";
import { PORT } from "@/port";
import { useStore } from "vuex";
import preloadingVue from "@/components/pre-loading.vue";
import User from "@/models/User";
export default defineComponent({
  components: {
    uploadPdfVue,
    preloadingVue,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const v$ = useVuelidate();
    const store = useStore();
    const confirmDelete = ref<boolean>(false);
    //ยังไม่กำหนด any ไปก่อน
    const applicationJob = reactive<ApplicationJob>(def_applicationJob);
    const user = reactive<User>(store.state.user);

    const declineApplicant = (applicant: ApplicationJob) => {
      //ปฏิ
      Swal.fire({
        title: "ปฏิเสธผู้สมัคร",
        text: "คุณแน่ใจแล้วใช่ไหมที่จะปฏิเสธผู้สมัครรายนี้",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "hsl(141, 50%, 48%)",
        cancelButtonColor: "hsl(348, 100%, 61%)",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          applicant.state = "declined";
          axios
            .post(`${PORT}` + "/application/declineApplicationJob", applicant)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              // handle error
              console.log(error);
            });
          Swal.fire({
            position: "center",
            icon: "success",
            title: "ทำการปฏิเสธผู้สมัครเรียบร้อย",
            showConfirmButton: false,
            timer: 1500,
          });
          router.push("/ListApplicant");
        }
      });
    };
    const acceptApplicant = (applicant: ApplicationJob) => {
      console.log(applicant);
      Swal.fire({
        title: "รับผู้สมัคร",
        text: "",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "hsl(141, 50%, 48%)",
        cancelButtonColor: "hsl(348, 100%, 61%)",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          applicant.state = "accepted";
          axios
            .post(`${PORT}` + "/application/acceptApplicationJob", applicant)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              // handle error
              console.log(error);
            });
          Swal.fire({
            position: "center",
            icon: "success",
            title: "ทำการรับผู้สมัครเรียบร้อย",
            showConfirmButton: false,
            timer: 1500,
          });
          router.push("/ListApplicant");
        }
      });
    };
    onMounted(async () => {
      if (!localStorage.getItem("token")) {
        router.push("/signIn");
        return;
      }
      store.commit("LOADING_DATA", true);

      await axios.get(`${PORT}` + "/user/getData").then((res) => {
        store.commit("SET_USER", res.data.user);
      });
      await axios
        .get(
          `${PORT}` +
            "/application/getApplicationJobDetailById/" +
            route.params.id
        )
        .then((res) => Object.assign(applicationJob, res.data.applicantJob));
      store.commit("LOADING_DATA", false);
    });

    let select_option = ref<string>("resume");

    return {
      v$,
      confirmDelete,
      router,
      route,
      applicationJob,
      select_option,
      declineApplicant,
      acceptApplicant,
      user,
      store,
    };
  },
});
</script>


<style scoped>
.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

/* Add some padding inside the card container */
.container {
  padding: 2px 16px;
}
</style>