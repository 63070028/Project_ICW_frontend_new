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

            <userProfileVue :id="applicant.id" :firstName="applicant.firstName" :lastName="applicant.lastName"
                :email="applicant.email" :birthDate="applicant.birthDate" :address="applicant.address"
                :gender="applicant.gender" :phone="applicant.phone" v-if="select_option === 'user_profile'">
            </userProfileVue>

            <uploadPdfVue :maxSize="100" :upload_category="select_option" v-if="select_option === 'resume'" :url="applicant.resume"></uploadPdfVue>
            <uploadPdfVue :maxSize="100" :upload_category="select_option" v-if="select_option === 'transcript'">
            </uploadPdfVue>
            <uploadPdfVue :maxSize="100" :upload_category="select_option" v-if="select_option === 'portfolio'">
            </uploadPdfVue>

            <ApplicantDetail v-if="select_option === 'preview'"></ApplicantDetail>

        </div>

        <div class="column is-2"></div>
    </div>
</template>



<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import userProfileVue from '@/components/user-profile.vue'
import uploadPdfVue from '@/components/upload-pdf.vue'
import Applicant from '@/models/Applicant'
import ResumeOld from '@/assets/ResumeOld';
import ApplicantDetail from '../Company/ApplicantDetail.vue';

export default defineComponent({
    components: {
        userProfileVue,
        uploadPdfVue,
        ApplicantDetail
    },
    setup() {
        const applicant = reactive<Applicant>({
            id: 0,
            firstName: 'test',
            lastName: 'test',
            email: 'xxx@gmail.com',
            birthDate: '2001-08-01',
            gender: 'male',
            address: 'xxxx',
            phone: '08x-xxxxx',
            resume: 'data:application/pdf;base64, ' + ResumeOld,
            transcript: '',
            portfolio: '',
        })

        let select_option = ref<string>("user_profile")

        return {
            select_option, applicant
        }

    },
})
</script>
