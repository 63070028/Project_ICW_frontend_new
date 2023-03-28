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

        <div v-if="company.vdo != ''" class="vdo mt-4 mb-6" v-html="company.vdo"></div>


        <p class="has-background-dark has-text-weight-bold has-text-white is-size-3 mt-6 p-3 has-text-weight-medium">
            ตำแหน่งที่รับสมัคร</p>
        <div class="job_content p-3" v-for="job, index in jobs" :key="index" style="border-bottom:0.5px solid gray;" @click="viewJob(job.id)">
            <p class="is-size-4 has-text-weight-bold">{{ index + 1 + "." }} {{ job.name }}</p>
            <div class="columns is-multiline ml-6 mt-1">
                <p class="column is-6">สถานที่ทำงาน: {{ job.location }}</p>
                <p class="column is-6">ค่าตอบแทนรายวัน: {{ job.salary_per_day }}</p>
                <p class="column is-6">รูปแบบการสัมภาษณ์: {{ job.interview }}</p>
                <p class="column is-6">จำนวนที่รับ: {{ job.capacity }}</p>
            </div>
        </div>

    </div>
</template>



<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Company from '@/models/Company';
import Job from '@/models/Job';


export default defineComponent({
    setup() {
        const router = useRouter();
        const route = useRoute();

        //def
        const company = reactive<Company>({
            id: Number(route.params.id),
            name: "None",
            description: "None",
            profile_image: "",
            background_image: "",
            vdo: ""
        });

        const jobs = reactive<Job[]>([])


        onMounted(() => {
            console.log('get api company id: ' + route.params.id)

            //set company
            const get_company = { id: 1, name: "ไม่ทำงาน จำกัด หมาชน", description:"THiNKNET คือ บริษัท IT ที่สร้างสรรค์ผลิตภัณฑ์และบริการที่มุ่งพัฒนาคุณภาพชีวิตของคนไทยให้ดีขึ้น ก่อตั้งขึ้นในปี 2000 ผลงานโดดเด่นคือ JobThai แพลตฟอร์มหาคน หางาน สมัครงานอันดับ 1 ของประเทศ ที่ช่วยให้คนไทยมีงานทำมานานมากกว่า 20 ปี นอกจากนี้แล้ว THiNKNET ยังพัฒนาสินค้าและบริการอื่น ๆ ออกมาอยู่เสมอ เช่น Mapping & GIS Solutions, THiNKNET Design Studio", profile_image:"https://cdn.discordapp.com/attachments/905751963017285634/1089481386349580359/profile-icon-design-free-vector.png", background_image:"https://www.w3schools.com/w3images/workbench.jpg", vdo:'<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' }
            Object.assign(company, get_company)
            

            console.log('get api job by company_id: ' + route.params.id);

            let get_jobs = [
                { id: 0, company_id: 1, name: "ฝึกงาน ตำแหน่ง Software Engineer", salary_per_day: 500, location: "sssss", capacity: 10, detail: "", interview: "online", qualifications: ["111", "2222"], contact: { name: "chanapon", email: "xxxxx@hotmail.com", phone: "08xxxxxxxx" } },
                { id: 1, company_id: 1, name: "ฝึกงาน ตำแหน่ง Software Engineer", salary_per_day: 500, location: "sssss", capacity: 10, detail: "", interview: "online", qualifications: ["111", "2222"], contact: { name: "chanapon", email: "xxxxx@hotmail.com", phone: "08xxxxxxxx" } },
                { id: 2, company_id: 1, name: "ฝึกงาน ตำแหน่ง Software Engineer", salary_per_day: 500, location: "sssss", capacity: 10, detail: "", interview: "online", qualifications: ["111", "2222"], contact: { name: "chanapon", email: "xxxxx@hotmail.com", phone: "08xxxxxxxx" } },
            ]

            get_jobs.forEach(job => {
                jobs.push(job)
            });
        });

        const viewJob = (id: number) => {
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
    width: 150px;
    height: 150px;
    border: 2px solid gray;
    border-radius: 25px;
}

.vdo {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.job_content:hover {
    background-color: hsl(0, 0%, 96%);
}
</style>
