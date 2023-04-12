<template>
    <div class="columns mt-6">
        <div class="column is-2"></div>
        <div class="tabs is-boxed column is-8">
            <ul>
                <li :class="[select_option === 'user_profile' ? 'is-active' : '']" @click="select_option = 'user_profile'">
                    <a>
                        <span>User Profile</span>
                    </a>
                </li>
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
                <li :class="[select_option === 'preview' ? 'is-active' : '']" @click="select_option = 'preview'">
                    <a>
                        <span>ตัวอย่างใบยื่นสมัคร</span>
                    </a>
                </li>

            </ul>

            <applicantProfileVue :id="applicant.id" :firstName="applicant.firstName" :lastName="applicant.lastName"
                :email="applicant.email_profile" :birthDate="applicant.birthDate" :address="applicant.address"
                :gender="applicant.gender" :phone="applicant.phone" v-if="select_option === 'user_profile'">
            </applicantProfileVue>

            <uploadPdfVue :maxSize="100" :upload_category="select_option" v-if="select_option === 'resume'"
                :url="applicant.resume"></uploadPdfVue>
            <uploadPdfVue :maxSize="100" :upload_category="select_option" v-if="select_option === 'transcript'"
                :url="applicant.transcript">
            </uploadPdfVue>
            <uploadPdfVue :maxSize="100" :upload_category="select_option" v-if="select_option === 'portfolio'"
                :url="applicant.portfolio">
            </uploadPdfVue>

            <ApplicantDetail v-if="select_option === 'preview'"></ApplicantDetail>

        </div>

        <div class="column is-2"></div>
    </div>
</template>



<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import applicantProfileVue from '@/components/applicant-profile.vue'
import uploadPdfVue from '@/components/upload-pdf.vue'
import Applicant from '@/models/Applicant'
import ApplicantDetail from '@/views/Company/ApplicantDetail.vue';

export default defineComponent({
    components: {
        applicantProfileVue,
        uploadPdfVue,
        ApplicantDetail
    },
    setup() {
        const applicant = reactive<Applicant>({
            id: "",
            firstName: 'test',
            lastName: 'test',
            email_profile: 'xxx@gmail.com',
            birthDate: '2001-08-01',
            gender: 'male',
            address: 'xxxx',
            phone: '08x-xxxxx',
            resume: 'https://s3.amazonaws.com/chanapon.icw.bucket/resume/xxx-638d7ae3-217f-4631-8ed3-6eaf1ed4c281-ResumeOld.pdf',
            transcript: '',
            portfolio: '',
            state:"on"
        })

        let select_option = ref<string>("user_profile")

        onMounted(() => {
            //get applicant/:id
            //set value in applicant
        })

        return {
            select_option, applicant
        }

    },
})
</script>
