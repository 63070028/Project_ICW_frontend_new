<template>
    <div class="signin_content px-6 pb-6 pt-1">
        <h1 class="is-size-1 has-text-centered m-5 has-text-weight-bold">Admin</h1>
        <div class="field ">
            <label class="label is-large">Email</label>
            <div class="control">
                <input :class="['input', v$.email.$errors.length ? 'is-danger' : '']" v-model="v$.email.$model"
                    class="input" type="text">
            </div>
            <div class="has-text-danger" v-for="error of v$.email.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>
        <div class="field ">
            <label class="label is-large">Password</label>
            <div class="control">
                <input :class="['input', v$.password.$errors.length ? 'is-danger' : '']" v-model="v$.password.$model"
                    class="input " type="password">
            </div>
            <div class="has-text-danger" v-for="error of v$.password.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>
        <div class="field mt-6">
            <div class="control">
                <button class="button is-success  is-fullwidth" @click="submitSignIn()">Sign In</button>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { defineComponent, ref } from 'vue'
import { required, helpers } from '@vuelidate/validators'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2';

import axios from 'axios';
import { PORT } from '@/port';
import { useStore } from 'vuex'

export default defineComponent({
    setup() {
        const v$ = useVuelidate()
        const store = useStore();
        const email = ref<string>("");
        const password = ref<string>("");
        const router = useRouter();
        const select_role = ref<string>("admin")



        const submitSignIn = async () => {
            const isFormCorrect = await v$.value.$validate();
            if (!isFormCorrect) return

            const data = {
                email: email.value,
                password: password.value,
                role: select_role.value
            }

            axios.post(`${PORT}` + '/user/signIn', data)
                .then(response => {
                    // handle success
                    localStorage.setItem("token", response.data.token);
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'เข้าสู้ระบบสำเร็จ',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(() => { router.push("/") }, 1500);
                })
                .catch(error => {
                    // handle error
                    console.log(error);
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'ผิดพลาด',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
        }

        return { email, password, v$, submitSignIn, select_role, store }
    },
    validations() {
        return {
            email: {
                required: helpers.withMessage('กรุณากรอกอีเมล', required) //TEST Kong
            },
            password: {
                required: helpers.withMessage('กรุณากรอกรหัสผ่าน', required) //TEST1
            },
        }
    }
})
</script>

<style scoped>
.signin_content {
    margin: auto;
    margin-top: 6rem;
    width: 30%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
