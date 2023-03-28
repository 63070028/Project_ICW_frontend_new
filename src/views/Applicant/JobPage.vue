<template>
    <div class="has-background-light mt-3 p-6">
        <p class="is-size-5 p-5">ตำแหน่ง: {{job.name}}</p>
        <p class="is-size-5 p-5">สถานที่ทำงาน: {{job.location}}</p>
        <p class="is-size-5 p-5">ค่าตอบแทนรายวัน: {{job.location}}</p>
        <p class="is-size-5 p-5">รูปแบบการสัมภาษณ์: {{job.interview}}</p>
        <p class="is-size-5 p-5">จำนวนคำที่รับ: {{job.capacity}}</p>
    </div>
    <div class="mt-3 p-6">
        <p class="p-5 is-size-5 has-text-weight-semibold">รายละเอียดงาน</p>
        <p class="p-5 is-size-5 has-text-weight-semibold">คุณสมบัติผู้สมัคร</p>
        <p class="p-5 is-size-5 has-text-weight-semibold">ช่องทางติดต่อ</p>
    </div>
</template>



<script lang="ts">
import { defineComponent, onMounted, reactive} from 'vue'
import { useRoute, useRouter,} from 'vue-router'
import Job from '@/models/Job';

export default defineComponent({
    setup() {
        const router = useRouter();
        const route = useRoute();

        const job = reactive<Job>({
            id: 0,
            company_id: 0, 
            name: "Job", 
            salary_per_day: 500, 
            location: "None", 
            capacity: 0, 
            detail: "None", 
            interview: "online", 
            qualifications: ["111", "2222"], 
            contact: { name: "chanapon", email: "xxxxx@hotmail.com", phone: "08xxxxxxxx" }
        });

        onMounted(()=>{
            //get api job
            const get_job = { id: 0, company_id: 1, name: "ฝึกงาน ตำแหน่ง Software Engineer", salary_per_day: 500, location: "sssss", capacity: 10, detail: "", interview: "online", qualifications: ["111", "2222"], contact: { name: "chanapon", email: "xxxxx@hotmail.com", phone: "08xxxxxxxx" }}
            Object.assign(job, get_job)
            
        });

        
        return {
            router,
            route,
            job
        }
    },
})
</script>
