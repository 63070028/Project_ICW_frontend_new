<template>
    <div class="signup_content px-6 pb-6 pt-1">
        <h1 class="is-size-1 has-text-centered m-5 has-text-weight-bold">Sign Up</h1>
        <div class="columns select-role">
            <button
                :class="['column', 'button', 'is-dark', 'p-1', 'is-size-6', select_role === 'company' ? 'is-outlined' : '']"
                @click="siwtchApplicant()">
                หางาน
            </button>
            <button
                :class="['column', 'button', 'is-dark', 'p-1', 'is-size-6', select_role === 'applicant' ? 'is-outlined' : '']"
                @click="siwtchCompany()">
                หาคน
            </button>
        </div>
        <div class="field">
            <label class="label">Email</label>
            <div class="control">
                <input :class="['input', v$.email.$errors.length ? 'is-danger' : '']" type="email"
                    v-model="v$.email.$model">
            </div>
            <div class="has-text-danger" v-for="error of v$.email.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>

        <div class="field">
            <label class="label">Password</label>
            <div class="control">
                <input :class="['input', v$.password.$errors.length ? 'is-danger' : '']" type="password"
                    v-model="v$.password.$model">
            </div>
            <div class="has-text-danger" v-for="error of v$.password.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>

        <div class="field">
            <label class="label">Confirm Password</label>
            <div class="control">
                <input :class="['input', v$.confirmPassword.$errors.length ? 'is-danger' : '']" type="password"
                    v-model="v$.confirmPassword.$model">
            </div>
            <div class="has-text-danger" v-for="error of v$.confirmPassword.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>

        <div class="field">
            <div class="control">
                <button class="button is-success is-large is-fullwidth" @click="submitForm">Submit</button>
            </div>
        </div>

    </div>
</template>


<script lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, sameAs, helpers } from '@vuelidate/validators'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2';
import axios from 'axios';
import { PORT } from '@/port';
import { defineComponent, ref } from 'vue'
import ApplicantSignUpModel from '@/models/formModels/ApplicantSignUpModel';
import CompanySignUpModel from '@/models/formModels/CompanySignUpModel';
import { reactive } from 'vue';

// const alpha = helpers.regex(/^[a-zA-Z]*$/)
const emailValid = helpers.regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

export default defineComponent({
    setup() {
        const v$ = useVuelidate()
        const router = useRouter();
        const email = ref<string>("");
        const password = ref<string>("");
        const confirmPassword = ref<string>("");
        const select_role = ref<string>("applicant")

        const formApplicantSignUp = reactive<ApplicantSignUpModel>({
            email: "",
            password: "",
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
            state:""
        })

        const formCompanySignUp = reactive<CompanySignUpModel>({
            email: "",
            password: "",
            name: "",
            description: "",
            profile_image: "",
            background_image: "",
            video_iframe: "",
            state:""
        })

        const siwtchApplicant = () => {
            select_role.value = "applicant";
        }
        const siwtchCompany = () => {
            select_role.value = "company";
        }


        const submitForm = async () => {
            const isFormCorrect = await v$.value.$validate();
            if (!isFormCorrect) return

            if (select_role.value === "applicant") {
                formApplicantSignUp.email = email.value
                formApplicantSignUp.password = password.value

                console.log(formApplicantSignUp)
                axios.post(`${PORT}` + '/applicant/signUp', formApplicantSignUp)
                    .then((response) => {
                        // handle success
                        console.log(response.data.message);
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Success',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        setTimeout(() => { router.push("/") }, 1500);
                    })
                    .catch((error) => {
                        // handle error
                        console.log(error);
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Error',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
            }
            else {
                formCompanySignUp.email = email.value;
                formCompanySignUp.password = password.value;
                console.log(formCompanySignUp)
                //api post signup/company
                axios.post(`${PORT}` + '/company/signUp', formCompanySignUp)
                    .then((response) => {
                        // handle success
                        console.log(response);
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Success',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        setTimeout(() => { router.push("/") }, 1500);
                    })
                    .catch((error) => {
                        // handle error
                        console.log(error);
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Error',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
            }


        }
        return { email, password, confirmPassword, v$, submitForm, select_role, siwtchApplicant, siwtchCompany, formApplicantSignUp, formCompanySignUp }
    },
    validations() {
        return {
            email: {
                required: helpers.withMessage('กรุณากรอบอีเมล', required),
                emailValid: helpers.withMessage('มันไม่อีเมล', emailValid)
            },
            password: {
                required: helpers.withMessage('กรุณากรอบรหัสผ่าน', required),
                minLength: minLength(8)
            },
            confirmPassword: {
                required: helpers.withMessage('กรุณากรอบรหัสอีกครั้ง', required),
                sameAsPassword: sameAs(this.password)
            },
        }
    },


})
</script>

<style scoped>
@import '../assets/styles/signup.css';
</style>