<template>
    <div class="container mt-4">
        <img src="https://www.w3schools.com/w3images/workbench.jpg" class="background_image">
        <div class="program_header mt-3">
            <p class="is-size-2">โครงการ {{ program.name }}</p>
            <p class="is-size-4 mt-3">โดย ...</p>
        </div>
        <div class="program_description">
            <p class="is-size-5">{{ program.description }}</p>
        </div>
        <div class="program_info_display">
            <p class="is-size-4">หลักสูตรการฝึกงาน</p>
            <p class="ml-6 mt-3">{{ program.course }}</p>
        </div>
        <div class="program_info_display">
            <p class="is-size-4">ตำแหน่งที่เปิดรับ</p>
            <ul class="ml-6 mt-3">
                <li v-for="job, index in program.jobs_title" :key="index">{{ index + 1 }}. {{ job }}</li>
            </ul>
        </div>
        <div class="program_info_display">
            <p class="is-size-4">คุณสมบัติ</p>
            <ul class="ml-6 mt-3">
                <li v-for="qualification, index in program.qualifications" :key="index">{{ index + 1 }}. {{ qualification }}
                </li>
            </ul>
        </div>
        <div class="program_info_display">
            <p class="is-size-4">สิทธิประโยชน์</p>
            <ul class="ml-6 mt-3">
                <li v-for="privilege, index in program.privileges" :key="index">{{ index + 1 }}. {{ privilege }}</li>
            </ul>
        </div>
        <div class="columns mt-6 submit_button">
            <button class="button column is-6 m-3 is-success is-medium" @click="isSubmit = !isSubmit">ยืนสมัตร</button>
        </div>
    </div>


    <div :class="['modal', isSubmit ? 'is-active' : '']">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">เลือกตำแหน่งที่ต้องการยืนสมัคร</p>
                <button class="delete" aria-label="close" @click="isSubmit = !isSubmit"></button>
            </header>
            <section class="modal-card-body">
                <div class="control">
                    <div class="select">
                        <select v-model="v$.selectedJob.$model">
                            <option value="">เลือกตำแหน่ง</option>
                            <option v-for="job, index in program.jobs_title" :key="index" :value="job">{{ job }}</option>
                        </select>
                    </div>
                    <div class="has-text-danger" v-for="error of v$.selectedJob.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success" @click="submitApplication()">Submit</button>
                <button class="button" @click="isSubmit = !isSubmit">Cancel</button>
            </footer>
        </div>
    </div>
</template>



<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Program from '@/models/Program'
import Swal from 'sweetalert2'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import ApplicationProgram from '@/models/ApplicationProgram'
export default defineComponent({
    setup() {


        const program = reactive<Program>({
            id: "",
            company_id: "",
            name: "",
            description: "", // เพิ่มคุณสมบัติ description
            course: "",
            jobs_title: [],
            qualifications: [],
            privileges: [],
            image: '',
            state: ""
        })

        const applicationProgram = reactive<ApplicationProgram>({
            id: "",
            applicant_id: "",
            company_name: "",
            program_id: "",
            program_name: "",
            job_title: "",
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
            status: "",
        })

        const router = useRouter();
        const route = useRoute();
        const v$ = useVuelidate();

        const selectedJob = ref('')

        const isSubmit = ref(false);


        onMounted(() => {

            //api get program form route.params.id

            const get_program: Program = {
                id: "",
                company_id: "",
                name: "",
                description: "", // เพิ่มคุณสมบัติ description
                course: "",
                jobs_title: ['SE', 'NW', "ML"],
                qualifications: [""],
                privileges: [""],
                image: "",
                state: ""
            }


            Object.assign(program, get_program)

        });

        const submitApplication = async () => {
            const isFormCorrect = await v$.value.$validate();
            if (!isFormCorrect) return

            //ส่งใบสมัครโครงการ applicationProgram            
            //api post /sendAppplicationProgram


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
                    isSubmit.value = !isSubmit.value;
                }
            })
        };
        return {
            router,
            route,
            program,
            isSubmit,
            selectedJob,
            v$,
            submitApplication,
            applicationProgram
        }
    },
    validations() {
        return {
            selectedJob: {
                required: helpers.withMessage('กรุณาเลือกตำแหน่ง', required)
            }
        }
    }
})
</script>

<style scoped>
.background_image {
    width: 100%;
    height: 500px;
}

.program_header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.program_description {
    margin-top: 6rem;
}

.program_info_display {
    margin-top: 5rem;
    width: 80%;
}

.submit_button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>
