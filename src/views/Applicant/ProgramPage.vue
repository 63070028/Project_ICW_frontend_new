<template>
    <preloadingVue v-if="store.state.isLoadingData"></preloadingVue>
    <div class="container mt-4" v-if="!store.state.isLoadingData">
        <img :src="program.image" class="background_image">
        <div class="program_header mt-3">
            <p class="is-size-2">โครงการ {{ program.name }}</p>
            <p class="is-size-4 mt-3">โดย {{program.company_name}}</p>
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
            <button class="button column is-6 m-3 is-success is-medium" @click="isSubmit = !isSubmit"
                v-if="store.state.user.role == 'applicant'">ยืนสมัตร</button>
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
import ApplicationProgramModel from '@/models/formModels/ApplicationProgramModel'
import { useStore } from 'vuex'
import User from '@/models/User'
import { PORT } from '@/port'
import axios from '@/plugins/axios';
import Applicant from '@/models/Applicant'
import getUserData from '@/plugins/getUser'
import { def_applicant, def_fromApplicationProgram, def_program } from '@/plugins/defaultValue'
import preloadingVue from '@/components/pre-loading.vue'
export default defineComponent({
    components: {
        preloadingVue
    },
    setup() {
        const program = reactive<Program>(def_program)
        const applicant = reactive<Applicant>(def_applicant)
        const fromApplicationProgram = reactive<ApplicationProgramModel>(def_fromApplicationProgram)

        const router = useRouter();
        const route = useRoute();
        const v$ = useVuelidate();

        const store = useStore();
        const user = reactive<User>(store.state.user)

        const selectedJob = ref<string>("")
        const isSubmit = ref<boolean>(false);


        const submitApplication = async () => {
            const isFormCorrect = await v$.value.$validate();
            if (!isFormCorrect) return

            if (applicant.state == '') {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "คุณยังไม่ได้ลงประวัติ",
                    showConfirmButton: false,
                    timer: 1500,
                });
                return
            }

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
            }).then(async (result) => {
                if (result.isConfirmed) {

                    fromApplicationProgram.applicant_id = applicant.id
                    fromApplicationProgram.company_name = program.company_name
                    fromApplicationProgram.company_id = program.company_id
                    fromApplicationProgram.program_id = program.id
                    fromApplicationProgram.program_name = program.name
                    fromApplicationProgram.job_title = selectedJob.value
                    fromApplicationProgram.firstName = applicant.firstName
                    fromApplicationProgram.lastName = applicant.lastName
                    fromApplicationProgram.email_profile = applicant.email_profile
                    fromApplicationProgram.birthDate = applicant.birthDate
                    fromApplicationProgram.gender = applicant.gender
                    fromApplicationProgram.address = applicant.address
                    fromApplicationProgram.phone = applicant.phone
                    fromApplicationProgram.resume = applicant.resume
                    fromApplicationProgram.transcript = applicant.transcript
                    fromApplicationProgram.portfolio = applicant.portfolio
                    fromApplicationProgram.creation_date = new Date().toLocaleDateString("en-US")
                    fromApplicationProgram.state = "pending"

                    console.log(fromApplicationProgram)
                    const swalWaiting: any = Swal.fire({
                        position: 'center',
                        title: 'Uploading...',
                        showConfirmButton: false,
                        didOpen: () => {
                            Swal.showLoading()
                        }
                    })

                    await axios.post(`${PORT}` + "/application/sendApplicationProgram", fromApplicationProgram).then(res => {
                        console.log(res.data.message)
                        swalWaiting.close();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "ดำเนิดการสำเร็จ",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    });

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

        onMounted(async () => {
            store.commit('LOADING_DATA', true)
            console.log("api get program form" + route.params.id)

            await getUserData();
            await axios.post(`${PORT}`+"/company/getProgramById", {program_id:route.params.id}).then(res => {
                console.log(res.data.program)
                Object.assign(program, res.data.program)
            })

            

            if (store.state.user.role === "applicant") {
                await axios.get(`${PORT}` + "/applicant/getProfileById/" + store.state.user.id).then(res => Object.assign(applicant, res.data.applicant))
            }
            store.commit('LOADING_DATA', false)

        });
        return {
            router,
            route,
            program,
            isSubmit,
            selectedJob,
            v$,
            submitApplication,
            store,
            user,
            applicant,
            fromApplicationProgram
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
