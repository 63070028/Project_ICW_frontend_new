<template>
    <div class="column ml-6 p-0">

        <div class="tabs">
            <ul>
                <li :class="[select_option_display === 'jobs' ? 'is-active' : '']" @click="select_option_display = 'jobs'">
                    <a>งาน</a>
                </li>
                <li :class="[select_option_display === 'programs' ? 'is-active' : '']"
                    @click="select_option_display = 'programs'"><a>โครงการ</a></li>
            </ul>
        </div>

        <listApplicantJobs v-if="select_option_display === 'jobs'" :items="application.jobs" :isCancel="enableCancel">
        </listApplicantJobs>
        <listApplicantProgram v-if="select_option_display === 'programs'" :items="myApplications.applicationProgram" :isCancel="enableCancel">
        </listApplicantProgram>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, reactive } from 'vue'
import Applications from '@/models/ApplicationJob';
import listApplicantJobs from './company-list-applicant-jobs.vue';
import listApplicantProgram from './company-list-applicant-program.vue';

export default defineComponent({

    props: {
        myApplications: {
            type: Object as PropType<Applications>,
            default: () => {
                return {
                    applicationJob: [],
                    applicationProgram: []
                }
            }
        },
        enableCancel:{
            type:Boolean,
            required: true
        }
    },
    components: {
        listApplicantJobs,
        listApplicantProgram
    },
    setup() {
    const application = reactive<{ jobs: Applications[] }>({
      jobs: [
        { id: 1, job_id: 1, applicant_id: 1, firstName: "Leon", lastName: "Saedy", email: "None", birthDate: "None", gender: "None", address: "None", phone: "None", resume: "None", transcript: "None", portfolio: "None", status: "ผ่าน", type: "None", },
        { id: 2, job_id: 2, applicant_id: 2, firstName: "Home", lastName: "Lander", email: "None", birthDate: "None", gender: "None", address: "None", phone: "None", resume: "None", transcript: "None", portfolio: "None", status: "ไม่ผ่าน", type: "None", },
        { id: 3, job_id: 3, applicant_id: 3, firstName: "Go", lastName: "sec", email: "None", birthDate: "None", gender: "None", address: "None", phone: "None", resume: "None", transcript: "None", portfolio: "None", status: "ระหว่างพิจารณา", type: "None", },
      ]
    });
    
        const select_option_display = ref<string>('jobs');




        return {
            select_option_display, application
        }
    },
})
</script>
