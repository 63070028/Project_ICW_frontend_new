<template>
    <div class="container mt-4">
        <img :src="company.background_image" class="background_image">
        <div class="columns is-gapless ml-6 mb-6" style="position: relative; top: -80px;">
            <img :src="company.profile_image" class="column is-2 profile_image">
            <div class="column ml-4" style="position: relative; top: 100px;">
                <p class="is-size-4 has-text-weight-bold">{{ company.name }}</p>
            </div>
        </div>
        <p class="is-size-5" style="position: relative; top: -40px;">{{ company.description }}</p>

        <div v-if="company.video_iframe != ''" class="video_iframe mt-4 mb-6" v-html="company.video_iframe"></div>


        <p class="has-background-dark has-text-weight-bold has-text-white is-size-3 mt-6 p-3 has-text-weight-medium">
            ตำแหน่งที่รับสมัคร</p>
        <div class="job_content p-3" v-for="job, index in jobs" :key="index" style="border-bottom:0.5px solid gray;"
            @click="viewJob(job.id)">
            <p class="is-size-4 has-text-weight-bold">{{ index + 1 + "." }} {{ job.name }}</p>
            <div class="columns is-multiline ml-6 mt-1">
                <div class="column is-6"><i class="pi pi-map-marker"> <span class="is-size-5 pl-4"><b>สถานที่ทำงาน: </b>{{
                    job.location
                }}</span></i></div>
                <div class="column is-6"><i class="pi pi-dollar"> <span class="is-size-5 pl-4"><b>ค่าตอบแทนรายวัน: </b>{{
                    job.location
                }}</span></i></div>
                <div class="column is-6"><i class="pi pi-user"><span class="is-size-5 pl-4"><b>จำนวนคำที่รับ: </b>{{
                    job.capacity
                }}</span></i></div>
                <p class="is-size-5 column is-6"><b>รูปแบบการสัมภาษณ์: </b>{{ job.interview }}</p>
            </div>
        </div>
    </div>
</template>



<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import 'primeicons/primeicons.css';
import Company from '@/models/Company';
import Job from '@/models/Job';
import axios from '@/plugins/axios';
import { PORT } from '@/port';
import {def_company,} from "@/plugins/defaultValue"
import getUserData from '@/plugins/getUser';

export default defineComponent({
    setup() {
        const router = useRouter();
        const route = useRoute();

        //def
        const company = reactive<Company>(def_company);

        const jobs = reactive<Job[]>([])


        onMounted(async () => {

            console.log('get api company id: ' + route.params.id)
            //set company

        

            // await axios.get(`${PORT}`+'/company/getProfile/'+route.params.id).then(res => Object.assign(company, res.data.company))

            // await axios.get(`${PORT}`+'/company//getJob/'+route.params.id).then(res=>{
            //     res.data.items.forEach((job:Job) =>{
            //         jobs.push(job)
            //     })
            // })

            // const get_jobs: Job[] = [
            //     { id: "1234-xxxx-xxxx-xxxx-xxxx", company_id: "xxxx-xxxx-xxxx-xxxx", company_name:"c_name", name: "ฝึกงาน ตำแหน่ง Software Engineer", salary_per_day: 500, location: "sssss", capacity: 10, detail: "", interview: "online", qualifications: ["111", "2222"], contact: { name: "chanapon", email: "xxxxx@hotmail.com", phone: "08xxxxxxxx" }, creation_date: "03/25/2015", state:"on" },
            // ]


        });

        const viewJob = (id: string) => {
            router.push("/jobs/" + id)
        }

        return {
            router,
            route,
            company,
            jobs,
            viewJob
        }
    },
})
</script>

<style scoped>
.background_image {
    width: 100%;
    height: 300px;
}

.profile_image {
    height: 190px;
    border: 2px solid gray;
    border-radius: 25px;
}

.video_iframe {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.job_content:hover {
    background-color: hsl(0, 0%, 96%);
}
</style>
