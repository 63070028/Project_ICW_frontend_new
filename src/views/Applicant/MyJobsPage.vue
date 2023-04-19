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

            <myjobApplication :enableCancel="true" :my-applications="myApplications" v-if="select_option === 'application'">
            </myjobApplication>

            <myjobFavoriteListVue :appicant_id="user.id" :items="myFavoriteJobs" v-if="select_option === 'favorite'">
            </myjobFavoriteListVue>

            <myjobApplication :enableCancel="false" :my-applications="myApplications" v-if="select_option === 'history'">
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
import preloadingVue from '@/components/preloading.vue';
export default defineComponent({
    components: {
        myjobApplication,
        myjobFavoriteListVue,
        preloadingVue
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

        let myFavoriteJobs = reactive<Job[]>([]);
        // const state = reactive<{ myFavoriteJobs: Job[] }>({ myFavoriteJobs: [] });

        // const updateMyFavoriteJobs = (newItems:Job[]) => {

        //     myFavoriteJobs.splice(0, myFavoriteJobs.length, ...newItems)
        // }


        onMounted(async () => {

            if (!localStorage.getItem('token')) {
                router.push('/signIn')
                return
            }

            store.commit('LOADING_DATA', true)
            await getUserData();

            await axios.post("/applicant/getMyJobFavorite", { applicant_id: user.id }).then(res => {
                console.log(res.data)
                const myJobs: Job[] = res.data;
                myJobs.forEach(job => myFavoriteJobs.push(job))
            })


            //api get /myApplicationJobs:id and filter status
            //api get /myApplicationPrograms:id filter status
            //api get /myFavoriteJobs:id

            //set 

            store.commit('LOADING_DATA', false)
        });

        return {
            select_option, myApplications, store, user, router, myFavoriteJobs
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
