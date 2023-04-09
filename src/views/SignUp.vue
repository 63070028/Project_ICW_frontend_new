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


<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, sameAs, helpers } from '@vuelidate/validators'
import Swal from 'sweetalert2';
import axios from 'axios';
import { PORT } from '@/port';

// const alpha = helpers.regex(/^[a-zA-Z]*$/)
const emailValid = helpers.regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

export default {
    setup() {
        return {
            v$: useVuelidate()
        }
    },
    data() {
        return {
            select_role: "applicant",
            email: "",
            password: "",
            confirmPassword: "",
        }
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

    methods: {
        siwtchApplicant() {
            this.select_role = "applicant";
        },
        siwtchCompany() {
            this.select_role = "company";
        },
        async submitForm() {
            const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect) return

            if (this.select_role === "applicant") {
                const data = {
                    email: this.email,
                    password: this.password
                }
                console.log(data)
                axios.post(`${PORT}` + '/applicant/signUp', data)
                    .then(function (response) {
                        // handle success
                        console.log(response);
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Success',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        setTimeout(() => { this.$router.push("/") }, 1500);
                    })
                    .catch(function (error) {
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
                const data = {
                    email: this.email,
                    password: this.password
                }
                console.log(data)
                //api post signup/company
                axios.post(`${PORT}` + '/company/signUp', data)
                    .then(function (response) {
                        // handle success
                        console.log(response);
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Success',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        setTimeout(() => { this.$router.push("/") }, 1500);
                    })
                    .catch(function (error) {
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
    }



}
</script>

<style scoped>
@import '../assets/styles/signup.css';
</style>