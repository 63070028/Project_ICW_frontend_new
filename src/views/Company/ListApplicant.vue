<template>
    <div class="container">
        <div class="columns mt-6">
            <companyListJobs :enableCancel="true" :my-applications="myApplications" v-if="select_option === 'application'"></companyListJobs>
            <myjobFavoriteListVue :items="myFavoriteJobs" v-if="select_option === 'favorite'"></myjobFavoriteListVue>
            <companyListJobs :enableCancel="false" :my-applications="myApplications" v-if="select_option === 'history'"></companyListJobs>
            <!-- <myjobHistoryList :items="[1, 2, 3, 4]" v-if="select_option === 'history'"></myjobHistoryList> -->

        </div>
    </div>
</template>



<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import companyListJobs from '@/components/company-list-applicant.vue';
import myjobFavoriteListVue from '@/components/myjob-favorite-list.vue';
import Applications from '@/models/Applications';
import Job from '@/models/Job';
export default defineComponent({
    components: {
        companyListJobs,
        myjobFavoriteListVue,
    },
    setup() {

        const select_option = ref<string>('application')
        const myApplications = reactive<Applications>({
            applicationJob: [1,2,3,4],
            applicationProgram: [1,2,3,4]
        });
        const myFavoriteJobs = reactive<Job[] | number[]>([1,2,3,4]);

        onMounted(() => {
            //api get /myApplicationJobs:id and filter status
            //api get /myApplicationPrograms:id filter status
            //api get /myFavoriteJobs:id

            //set 
        });

        return {
            select_option, myApplications, myFavoriteJobs
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
