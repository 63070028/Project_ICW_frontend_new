<template>
  <div class="column ml-6 p-0">
    <div class="tabs">
      <ul>
        <li
          :class="[select_option_display === 'jobs' ? 'is-active' : '']"
          @click="select_option_display = 'jobs'"
        >
          <a>งาน</a>
        </li>
        <li
          :class="[select_option_display === 'programs' ? 'is-active' : '']"
          @click="select_option_display = 'programs'"
        >
          <a>โครงการ</a>
        </li>
      </ul>
    </div>

    <listApplicantJobs
      v-if="select_option_display === 'jobs'"
      :items="applicationJobs"
      :isCancel="enableCancel"
    >
    </listApplicantJobs>

    <listApplicantProgram
      v-if="select_option_display === 'programs'"
      :items="applicationPrograms"
      :isCancel="enableCancel"
    >
    </listApplicantProgram>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted, reactive } from "vue";
import Applications from "@/models/Applications";
import ApplicationJob from "@/models/ApplicationJob";
import ApplicationProgram from "@/models/ApplicationProgram";
import listApplicantJobs from "./company-list-applicant-jobs.vue";
import listApplicantProgram from "./company-list-applicant-program.vue";
import axios from "axios";
import { PORT } from "@/port";

export default defineComponent({
  props: {
    myApplications: {
      type: Object as PropType<Applications>,
      default: () => {
        return {
          applicationJob: [],
          applicationProgram: [],
        };
      },
    },
    enableCancel: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    listApplicantJobs,
    listApplicantProgram,
  },
  setup() {
    
    const select_option_display = ref<string>("jobs");
    const applicationJobs = reactive<ApplicationJob[]>([]);
    const applicationPrograms = reactive<ApplicationProgram[]>([]);
    onMounted(() => {
  
      axios
        .get(`${PORT}` + "/application/getApplicantJob")
        .then((response) => {
          console.log(response.data.items);
          const get_applicationJob: ApplicationJob[] = response.data.items;
          console.log(get_applicationJob);
          get_applicationJob.forEach((appliacnt) => {
            applicationJobs.push(appliacnt);
          });
        })
        .catch((error) => {
          // handle error
          console.log(error);
        }); 
        axios
        .get(`${PORT}` + "/application/getApplicantProgram")
        .then((response) => {
          console.log(response.data.items);
          const get_applicationProgram: ApplicationProgram[] = response.data.items;
          console.log(get_applicationProgram);
          get_applicationProgram.forEach((appliacnt) => {
            applicationPrograms.push(appliacnt);
          });
        })
        .catch((error) => {
          // handle error
          console.log(error);
          console.log("test");
        });
    });


    return {
      select_option_display, applicationJobs, applicationPrograms
    };
  },
});
</script>
