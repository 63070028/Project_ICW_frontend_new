<template>
    <preloadingVue v-if="store.state.isLoadingData"></preloadingVue>
    <div class="columns mt-6" v-if="!store.state.isLoadingData">
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

            <applicantProfileVue :id="applicant.id" :address="applicant.address" :email_profile="applicant.email_profile"
                :birth-date="applicant.birthDate" :first-name="applicant.firstName" :last-name="applicant.lastName"
                :gender="applicant.gender" :phone="applicant.phone" :state="applicant.state"
                v-if="select_option === 'user_profile'">
            </applicantProfileVue>

            <uploadPdfVue :maxSize="100" :upload_category="select_option" v-if="select_option === 'resume'" 
                :url="applicant.resume" :role="'applicant'"></uploadPdfVue>
            <uploadPdfVue :maxSize="100" :upload_category="select_option" v-if="select_option === 'transcript'"
                :url="applicant.transcript" :role="'applicant'">
            </uploadPdfVue>
            <uploadPdfVue :maxSize="100" :upload_category="select_option" v-if="select_option === 'portfolio'"
                :url="applicant.portfolio" :role="'applicant'">
            </uploadPdfVue>
            <applicantPreview :appliacnt="applicant" v-if="select_option === 'preview' "></applicantPreview>
        </div>
        

        <div class="column is-2"></div>
    </div>
</template>



<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import applicantProfileVue from '@/components/applicant-profile.vue'
import uploadPdfVue from '@/components/upload-pdf.vue'
import Applicant from '@/models/Applicant'
import applicantPreview from '@/components/applicant-preview.vue'
import axios from '@/plugins/axios';
import { useStore } from 'vuex';
import User from '@/models/User';
import { PORT } from '@/port';
import router from '@/router'
import preloadingVue from '@/components/preloading.vue'

export default defineComponent({
    components: {
        applicantProfileVue,
        uploadPdfVue,
        applicantPreview,
        preloadingVue
    },
    setup() {

        const store = useStore();
        const user = reactive<User>(store.state.user)

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
        })

        let select_option = ref<string>("user_profile")
        onMounted(async () => {

            if(!localStorage.getItem('token')){
                router.push('/signIn')
                return
            }
            
            store.commit('LOADING_DATA', true)

            await axios.get(`${PORT}` + "/user/getData").then(res => {
                console.log(res.data.user)
                store.commit('SET_USER', res.data.user)
            })

            await axios.get(`${PORT}` + "/applicant/getProfile/" + user.id).then(res => {
                console.log(res.data.applicant)
                Object.assign(applicant, res.data.applicant);
            })
            store.commit('LOADING_DATA', false)
        })

        return {
            select_option, applicant, store, user
        }

    },
})
</script>
