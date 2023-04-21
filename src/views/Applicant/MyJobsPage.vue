<template>
    <preloadingVue v-if="store.state.isLoadingData"></preloadingVue>
    <div class="container" v-if="!store.state.isLoadingData">
        <div class="columns mt-6">
            <div class="column has-background-light is-3 pt-3 pb-3 card">
                <div
                    :class="['select_option', select_option === 'application' ? ['has-background-primary', 'has-text-white'] : '']">
                    <p class="has-text-centered is-size-5 p-3 " @click="select_option = 'application'">งานกำลังที่ยื่นสมัคร
                    </p>
                </div>
                <div
                    :class="['select_option', select_option === 'favorite' ? ['has-background-primary', 'has-text-white'] : '']">
                    <p class="has-text-centered is-size-5 p-3 " @click="select_option = 'favorite'">งานโปรด</p>
                </div>
                <div
                    :class="['select_option', select_option === 'history' ? ['has-background-primary', 'has-text-white'] : '']">
                    <p class="has-text-centered is-size-5 p-3 " @click="select_option = 'history'">งานที่เคยยื่น</p>
                </div>
            </div>

            <myjobApplication :enableCancel="true" :my-applications="myApplications" v-if="select_option === 'application'"
                @cancelApplicationJob="updateMyApplicationJob($event)"
                @cancelApplicationProgram="updateMyApplicationProgram($event)">
            </myjobApplication>

            <myjobFavoriteListVue :appicant_id="user.id" :items="myFavoriteJobs" v-if="select_option === 'favorite'"
                @remove="updateMyFavoriteJobs($event)">
            </myjobFavoriteListVue>

            <myjobApplication :enableCancel="false" :my-applications="myApplicationsHistory"
                v-if="select_option === 'history'">
            </myjobApplication>
            <!-- <myjobHistoryList :items="[1, 2, 3, 4]" v-if="select_option === 'history'"></myjobHistoryList> -->

        </div>
    </div>
</template>



<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import myjobApplication from '@/components/myjob-application.vue';
import myjobFavoriteListVue from '@/components/myjob-favorite-list.vue';
import Applications from '@/models/Applications';
import Job from '@/models/Job';
import User from '@/models/User';
import { useStore } from 'vuex';
import axios from '@/plugins/axios';
import getUserData from '@/plugins/getUser';
import { useRouter } from 'vue-router';
import preloadingVue from '@/components/pre-loading.vue';
import { PORT } from '@/port';
import ApplicationJob from '@/models/ApplicationJob';
import ApplicationProgram from '@/models/ApplicationProgram';
export default defineComponent({
    components: {
        myjobApplication,
        myjobFavoriteListVue,
        preloadingVue,
    },
    setup() {
        const store = useStore()
        const user = reactive<User>(store.state.user)
        const router = useRouter();
        const select_option = ref<string>('application')
        const myApplications = reactive<Applications>({
            applicationJob: [],
            applicationProgram: []
        });

        const myApplicationsHistory = reactive<Applications>({
            applicationJob: [],
            applicationProgram: []
        });

        const myFavoriteJobs = reactive<Job[]>([]);

        const updateMyFavoriteJobs = (job_id: string) => {
            const index = myFavoriteJobs.findIndex(job => job.id === job_id);
            if (index !== -1) {
                myFavoriteJobs.splice(index, 1);
            }

        }

        const updateMyApplicationJob = (applicationJob_id: string) => {
            console.log(applicationJob_id)
            const index = myApplications.applicationJob.findIndex(job => job.id === applicationJob_id);
            myApplications.applicationJob[index].state = "cancel"
            //update MyApplicationJobHistoy
            myApplicationsHistory.applicationJob.push(myApplications.applicationJob[index])

            //update MyApplicationJob
            if (index !== -1) {
                myApplications.applicationJob.splice(index, 1);
            }

        }

        const updateMyApplicationProgram = (applicationProgram_id: string) => {
            console.log(applicationProgram_id)
            const index = myApplications.applicationProgram.findIndex(job => job.id === applicationProgram_id);
            myApplications.applicationProgram[index].state = "cancel"
            //update MyApplicationProgramHistoy
            myApplicationsHistory.applicationProgram.push(myApplications.applicationProgram[index])

            //update MyApplicationProgram
            if (index !== -1) {
                myApplications.applicationProgram.splice(index, 1);
            }

        }

        onMounted(async () => {

            if (!localStorage.getItem('token')) {
                router.push('/signIn')
                return
            }

            store.commit('LOADING_DATA', true)
            await getUserData();

            await axios.post(`${PORT}` + "/applicant/getMyJobFavorite", { applicant_id: user.id }).then(res => {
                console.log(res.data)
                const myJobs: Job[] = res.data;
                myJobs.forEach(job => myFavoriteJobs.push(job))
            })


            await axios.get(`${PORT}` + "/application/getApplicationJobsByApplicantId/" + user.id).then((res) => {
                const myApplicationJobs: ApplicationJob[] = res.data
                const myApplicationJobsIsPending = myApplicationJobs.filter(item => item.state == "pending")
                const myApplicationJobsIsHistory = myApplicationJobs.filter(item => item.state != "pending")
                myApplicationJobsIsPending.forEach(applicantJob => myApplications.applicationJob.push(applicantJob))
                myApplicationJobsIsHistory.forEach(applicantJob => myApplicationsHistory.applicationJob.push(applicantJob))
            })

            await axios.get(`${PORT}` + "/application/getApplicationProgramsByApplicantId/" + user.id).then((res) => {
                const myApplicationPrograms: ApplicationProgram[] = res.data
                const myApplicationProgramsIsPending = myApplicationPrograms.filter(item => item.state == "pending")
                const myApplicationProgramsIsHistory = myApplicationPrograms.filter(item => item.state != "pending")
                myApplicationProgramsIsPending.forEach(applicantProgram => myApplications.applicationProgram.push(applicantProgram))
                myApplicationProgramsIsHistory.forEach(applicantProgram => myApplicationsHistory.applicationProgram.push(applicantProgram))
            })



            store.commit('LOADING_DATA', false)
        });

        return {
            select_option, myApplications, store, user, router, myFavoriteJobs, updateMyFavoriteJobs, myApplicationsHistory, updateMyApplicationJob, updateMyApplicationProgram
        }
    },
})
</script>

<style scoped>
.select_option {
    cursor: pointer;
}

.select_option:hover {
    background-color: rgb(255, 255, 255);
}</style>
