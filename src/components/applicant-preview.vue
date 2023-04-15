
<template>
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
  <div class="w3-light-grey">
      <div class="card">
        <div class="columns mt-0">
          <div class="tabs is-boxed column p-6">
            <div>
              <div class="column">
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
            <uploadPdfVue :maxSize="100" :upload_category="select_option" v-if="select_option === 'resume'"
              :role="'company'" :url="applicant.resume">
            </uploadPdfVue>
            <uploadPdfVue :maxSize="100" :upload_category="select_option" v-if="select_option === 'transcript'"
              :role="'company'" :url="applicant.transcript">
            </uploadPdfVue>
            <uploadPdfVue :maxSize="100" :upload_category="select_option" v-if="select_option === 'portfolio'"
              :role="'company'" :url="applicant.portfolio">
            </uploadPdfVue>
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, PropType } from "vue";
import { useRoute, useRouter } from "vue-router";
import uploadPdfVue from "@/components/upload-pdf.vue";
import Applicant from "@/models/Applicant";
import "primeicons/primeicons.css";
import { useVuelidate } from "@vuelidate/core";
export default defineComponent({
  components: {
    uploadPdfVue,
  },
  props: {
    appliacnt: {
      type: Object as PropType<Applicant>,
      required: true
    },
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const v$ = useVuelidate();

    //ยังไม่กำหนด any ไปก่อน
    const applicant = reactive<Applicant>({
      id: props.appliacnt.id,
      firstName: props.appliacnt.firstName,
      lastName: props.appliacnt.lastName,
      email_profile: props.appliacnt.email_profile,
      birthDate: props.appliacnt.birthDate,
      gender: props.appliacnt.gender == "male"?"ชาย":"หญิง",
      address: props.appliacnt.address,
      phone: props.appliacnt.phone,
      resume: props.appliacnt.resume,
      transcript: props.appliacnt.transcript,
      portfolio: props.appliacnt.portfolio,
      state: props.appliacnt.state
    });

    const select_option = ref<string>("resume");


    return {
      v$,
      router,
      route,
      applicant,
      select_option,
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
}</style>