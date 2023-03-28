<template>
    <div class="field">
        <label class="label">First Name</label>
        <div class="control">
            <input :class="['input', v$.firstName.$errors.length ? 'is-danger' : '']" type="text"
                v-model="v$.firstName.$model">
        </div>
        <!-- <div class="has-text-danger" v-if="v$.firstName.$error">Field is required.</div> -->
        <div class="has-text-danger" v-for="error of v$.firstName.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
        </div>
    </div>
    <div class="field">
        <label class="label">Last Name</label>
        <div class="control">
            <input :class="['input', v$.lastName.$errors.length ? 'is-danger' : '']" type="text"
                v-model="v$.lastName.$model">
        </div>
        <div class="has-text-danger" v-for="error of v$.lastName.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
        </div>
    </div>

    <div class="field">
        <label class="label">Email</label>
        <div class="control">
            <input :class="['input', v$.email.$errors.length ? 'is-danger' : '']" type="email" v-model="v$.email.$model">
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
</template>


<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, sameAs, helpers } from '@vuelidate/validators'
// import axios from 'axios';
import Swal from 'sweetalert2';

const alpha = helpers.regex(/^[a-zA-Z]*$/)
const emailValid = helpers.regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

export default {
    name: "SignUp",
    setup() {
        return {
            v$: useVuelidate()
        }
    },
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    },
    validations() {
        return {
            firstName: {
                required: helpers.withMessage('กรุณากรอบชื่อ', required),
                alpha: helpers.withMessage('ตัวอักษะเท่านั้น', alpha)
            },
            lastName: {
                required: helpers.withMessage('กรุณากรอบนามสกุล', required),
                alpha: helpers.withMessage('ตัวอักษะเท่านั้น', alpha)
            },
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
        async submitForm() {
            const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect) return
            let data = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
                role: "applicant"
            }
            console.log(data)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Success',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(()=>{this.$router.push("/")}, 1500);
        }
    }



}
</script>

<style scoped>
@import '../assets/styles/signup.css';
</style>