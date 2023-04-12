<template>
    <div class="container">
        <div class="columns mt-6">
            <companyListJobs :enableCancel="false" :my-applications="myApplications">
            </companyListJobs>
        </div>
    </div>
</template>



<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import companyListJobs from '@/components/company-list-applicant.vue';
import Applications from '@/models/Applications';

export default defineComponent({
    components: {
        companyListJobs,
    },
    setup() {


        const myApplications = reactive<Applications>({
            applicationJob: [],
            applicationProgram: []
        });


        onMounted(() => {
            //
        });

        return {
            myApplications
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
