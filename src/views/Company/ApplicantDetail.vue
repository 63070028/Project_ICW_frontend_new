
<template>
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
  <div class="w3-light-grey">
    <div class="w3-content w3-margin-top" style="max-width: 1400px">
      <div class="w3-container w3-card w3-white w3-margin-bottom">
        <div class="columns mt-6">
          <div class="column is-2"></div>
          <div class="tabs is-boxed column is-8">
            <div>
              <div class="column is-11">
                <p class="is-size-4 has-text-weight-bold">ผู้สมัครหมายเลข {{ route.params.id }}</p>
                <div class="columns is-multiline ml-6 mt-1">
                  <p class="column is-12">ชื่อ-นามสกุล: {{ applicant.firstName }} {{ applicant.lastName }}</p>
                  <p class="column is-6">เพศ: {{ applicant.gender }}</p>
                  <p class="column is-6">อีเมล: {{ applicant.email_profile }}</p>
                  <p class="column is-6">วัน-เดือน-ปี เกิด: {{ applicant.birthDate }}</p>
                  <p class="column is-6">ที่อยู่: {{ applicant.address }}</p>
                  <p class="column is-6">เบอร์โทร: {{ applicant.phone }}</p>
                  <div class="column is-6">
                  </div>
                  <div class="column is-1">
                    <button class="button is-small is-success" @click="acceptApplicant(applicant.id)">ผ่าน</button>
                  </div>
                  <div class="column is-1">
                    <button class="button is-small is-danger" @click="declineApplicant(applicant.id)">ไม่ผ่าน</button>
                  </div>
                </div>
              </div>
            </div>
            <ul>
              <li :class="[select_option === 'resume' ? 'is-active' : '']" @click="select_option = 'resume'">
                <a>
                  <span>Resume</span>
                </a>
              </li>
              <li :class="[select_option === 'transcript' ? 'is-active' : '']" @click="select_option = 'transcript'">
                <a>
                  <span>Transcript</span>
                </a>
              </li>
              <li :class="[select_option === 'portfolio' ? 'is-active' : '']" @click="select_option = 'portfolio'">
                <a>
                  <span>Portfolio</span>
                </a>
              </li>
            </ul>

            <uploadPdfVue :maxSize="100" :upload_category="select_option" v-if="select_option === 'resume'" :role="'company'">
            </uploadPdfVue>
            <uploadPdfVue :maxSize="100" :upload_category="select_option" v-if="select_option === 'transcript'" :role="'company'">
            </uploadPdfVue>
            <uploadPdfVue :maxSize="100" :upload_category="select_option" v-if="select_option === 'portfolio'" :role="'company'">
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
        <button class="delete" aria-label="close" @click="confirmDelete = !confirmDelete"></button>
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
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import uploadPdfVue from "@/components/upload-pdf.vue";
import Applicant from "@/models/Applicant";
import "primeicons/primeicons.css";
import Swal from "sweetalert2";
import { useVuelidate } from "@vuelidate/core";
export default defineComponent({
  components: {
    uploadPdfVue,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const v$ = useVuelidate();

    const confirmDelete = ref<boolean>(false);
    //ยังไม่กำหนด any ไปก่อน
    const applicant = reactive<Applicant>({
      id: "",
      firstName: "",
      lastName: "",
      email_profile: "",
      birthDate: "",
      gender: "",
      address: "",
      phone: "",
      resume: "",
      transcript: "",
      portfolio: "",
      state: ""
    });

    const declineApplicant = (applicant_id:string) => {
      //ปฏิ
      Swal.fire({
        title: "ปฏิเสธผู้สมัครหมายเลข " + applicant_id,
        text: "คุณแน่ใจแล้วใช่ไหมที่จะปฏิเสธผู้สมัครรายนี้",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "hsl(141, 50%, 48%)",
        cancelButtonColor: "hsl(348, 100%, 61%)",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "ทำการลบผู้สมัครเรียบร้อย",
            showConfirmButton: false,
            timer: 1500,
          });
          router.push("/ListApplicant");
        }
      });
    };
    const acceptApplicant = (applicant_id:string) => {
      //ปฏิ
      Swal.fire({
        title: "รับผู้สมัครหมายเลข " + applicant_id,
        text: "",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "hsl(141, 50%, 48%)",
        cancelButtonColor: "hsl(348, 100%, 61%)",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "ทำการรับผู้สมัครเรียบร้อย",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    };
    onMounted(() => {
      console.log("get api applicant id: " + route.params.id);

      //set applicant
      const get_applicant = {
        id: 1,
        firstName: "None",
        lastName: "None",
        position: "XXXX",
        email_profile: "XXX@gmail.com",
        address: "None",
        birthDate: "xx-xx-xxxx",
        gender: "Male",
        phone: "xxx-xxxxxxx",
        type: "Program",
      };
      Object.assign(applicant, get_applicant);
    });

    let select_option = ref<string>("user_profile");

    return {
      v$,
      confirmDelete,
      router,
      route,
      applicant,
      select_option,
      declineApplicant,
      acceptApplicant,
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