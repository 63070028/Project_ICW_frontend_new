<template>
    <div class="container mt-4">
        <div class="has-background-light box mt-3 pl-3 pr-4 pt-4 pb-4">
            <p class="has-text-right">{{ job.creation_date }}</p>
            <div class="columns mt-1">
                <div class="column is-11">
                    <p class="is-size-5 p-4"><b>{{ job.name }}</b></p>
                    <div class="pl-3">
                        <div class="p-4"><i class="pi pi-map-marker"> <span class="is-size-5 pl-4"><b>สถานที่ทำงาน: </b>{{
                            job.location
                        }}</span></i></div>
                        <div class="p-4"><i class="pi pi-dollar"> <span class="is-size-5 pl-4"><b>ค่าตอบแทนรายวัน: </b>{{
                            job.location
                        }}</span></i></div>
                        <div class="p-4"><i class="pi pi-user"><span class="is-size-5 pl-4"><b>จำนวนคำที่รับ: </b>{{
                            job.capacity
                        }}</span></i></div>
                        <p class="is-size-5 p-4"><b>รูปแบบการสัมภาษณ์: </b>{{ job.interview }}</p>
                    </div>
                </div>
                <div class="column" style="display: flex; flex-direction: column; justify-content:space-between;">
                    <button class="button is-danger">รายงาน</button>
                    <button class="button is-success" @click="submitApplication()">ยืนสมัคร</button>
                </div>
            </div>
        </div>
        <div style="display: flex; flex-direction: column; align-items:flex-end;">
            <i v-show="isMyFavorite == false" class="pi pi-heart m-5" style="font-size: 1.3rem; cursor: pointer;"
                @click="saveMyFavorite()"><span class="ml-2 prevent-select">รายการโปรด</span></i>

            <i v-show="isMyFavorite == true" class="pi pi-heart-fill m-5"
                style="color:#e41a50; font-size: 1.3rem; cursor: pointer;" @click="saveMyFavorite()"><span
                    class="ml-2 prevent-select" style="color:black;">รายการโปรด</span></i>
        </div>
        <div class="p-5">
            <p class="is-size-5 has-text-weight-semibold mt-6">รายละเอียดงาน</p>
            <p>{{ job.detail }}</p>
            <p class="is-size-5 has-text-weight-semibold mt-6">คุณสมบัติผู้สมัคร</p>
            <ul>
                <li v-for="qualification, index in job.qualifications" :key="index">{{ index + 1 + ". " }} {{ qualification
                }}</li>
            </ul>
            <p class="is-size-5 has-text-weight-semibold mt-6">ช่องทางติดต่อ</p>
            <p>{{ job.contact.name }}</p>
            <p>email: {{ job.contact.email }}</p>
            <p>เบอร์ติดต่อ: {{ job.contact.phone }}</p>
        </div>
    </div>
</template>



<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter, } from 'vue-router'
import Job from '@/models/Job';
import 'primeicons/primeicons.css';
import Swal from 'sweetalert2';

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
            contact: { name: "chanapon", email: "xxxxx@hotmail.com", phone: "08xxxxxxxx" },
            creation_date: "03/25/2015"
        });

        const isMyFavorite = ref<boolean>(false)

        const saveMyFavorite = () => {
            isMyFavorite.value = !isMyFavorite.value;
        };

        const submitApplication = () => {
            Swal.fire({
                title: 'Are you sure?',
                text: "คุณแน่ใจแล้วใช่ไหมที่จะยืนใบสมัคร",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'hsl(141, 50%, 48%)',
                cancelButtonColor: 'hsl(348, 100%, 61%)',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'ดำเนิดการสำเร็จ',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        };

        onMounted(() => {
            //get api job
            const get_job:Job = { id: 0, company_id: 1, name: "ฝึกงาน ตำแหน่ง Software Engineer", salary_per_day: 500, location: "sssss", capacity: 10, detail: "มาร่วมงานกับ THiNKNET หากคุณมีความหลงใหลในการใช้เทคโนโลยีเพื่อการพัฒนาหรือแก้ไขปัญหาต่าง ๆ และพร้อมที่จะเรียนรู้สิ่งใหม่ ๆ อยู่เสมอ เราคือองค์กรที่รวบรวมคนที่มีความรู้ความสามารถ มีสปิริต มีแพสชัน และมีความคิดสร้างสรรค์มาร่วมกันสร้างนวัตกรรมที่มีคุณค่าต่อสังคมและโลกใบนี้", interview: "online", qualifications: ["111", "2222"], contact: { name: "chanapon", email: "xxxxx@hotmail.com", phone: "08xxxxxxxx" }, creation_date: "03/25/2015" }
            Object.assign(job, get_job)
            //kong
        });



        return {
            router,
            route,
            job,
            isMyFavorite,
            saveMyFavorite,
            submitApplication
        }
    },
})
</script>

<style scoped >
.prevent-select {
    -webkit-user-select: none;
    /* Safari */
    -ms-user-select: none;
    /* IE 10 and IE 11 */
    user-select: none;
    /* Standard syntax */
}
</style>
