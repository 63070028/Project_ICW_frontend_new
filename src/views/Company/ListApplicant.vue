<template>
<preloadingVue v-if="store.state.isLoadingData"></preloadingVue>
    <div class="container" v-if="!store.state.isLoadingData">
        <div class="columns mt-6">
            <companyListApplication :enableCancel="false" :my-applications="Applications"
            @cancelApplicationJob="updateMyApplicationJob($event)"
                @cancelApplicationProgram="updateMyApplicationProgram($event)">
            </companyListApplication>
        </div>
    </div>
</template>



<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import companyListApplication from '@/components/company-list-applicant.vue';
import Applications from '@/models/Applications';
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
        companyListApplication,
        preloadingVue,
    },
    setup() {
        const store = useStore()
        const user = reactive<User>(store.state.user)
        const router = useRouter();
        const select_option = ref<string>('application')
        const Applications = reactive<Applications>({
            applicationJob: [],
            applicationProgram: []
        });

        const updateMyApplicationJob = (applicationJob_id: string) => {
            console.log(applicationJob_id)
            const index = Applications.applicationJob.findIndex(job => job.id === applicationJob_id);
            Applications.applicationJob[index].state = "cancel"
            //update MyApplicationJobHistoy

            //update MyApplicationJob
            if (index !== -1) {
                Applications.applicationJob.splice(index, 1);
            }

        }

        const updateMyApplicationProgram = (applicationProgram_id: string) => {
            console.log(applicationProgram_id)
            const index = Applications.applicationProgram.findIndex(job => job.id === applicationProgram_id);
            Applications.applicationProgram[index].state = "cancel"
            //update MyApplicationProgramHistoy

            //update MyApplicationProgram
            if (index !== -1) {
                Applications.applicationProgram.splice(index, 1);
            }

        }

        onMounted(async () => {

            if (!localStorage.getItem('token')) {
                router.push('/signIn')
                return
            }

            store.commit('LOADING_DATA', true)
            await getUserData();



            await axios.get(`${PORT}` + "/application/getApplicationJobsByCompanyId/" + user.id).then((res) => {
                const myApplicationJobs: ApplicationJob[] = res.data
                myApplicationJobs.sort((a, b) => new Date(a.creation_date) > new Date(b.creation_date) ? 1 : -1);

                const myApplicationJobsIsPending = myApplicationJobs.filter(item => item.state == "pending")
                myApplicationJobsIsPending.forEach(applicantJob => Applications.applicationJob.push(applicantJob))
                console.log(Applications.applicationJob)
            })

            await axios.get(`${PORT}` + "/application/getApplicationProgramsByCompanyId/" + user.id).then((res) => {
                const myApplicationPrograms: ApplicationProgram[] = res.data
                myApplicationPrograms.sort((a, b) => new Date(a.creation_date) > new Date(b.creation_date) ? 1 : -1);
                const myApplicationProgramsIsPending = myApplicationPrograms.filter(item => item.state == "pending")
                myApplicationProgramsIsPending.forEach(applicantProgram => Applications.applicationProgram.push(applicantProgram))
            })



            store.commit('LOADING_DATA', false)
        });

        return {
            select_option, Applications, store, user, router, updateMyApplicationJob, updateMyApplicationProgram
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
}
</style>
