<template>
    <div class="signin_content p-6">
        <h1 class="is-size-1 has-text-centered">Sign Up</h1>
        <div class="field ">
            <label class="label ">Email</label>
            <div class="control">
                <input :class="['input', v$.email.$errors.length ? 'is-danger' : '']" v-model="v$.email.$model"
                    class="input " type="text">
            </div>
            <div class="has-text-danger" v-for="error of v$.email.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>
        <div class="field ">
            <label class="label ">Password</label>
            <div class="control">
                <input :class="['input', v$.password.$errors.length ? 'is-danger' : '']" v-model="v$.password.$model"
                    class="input " type="password">
            </div>
            <div class="has-text-danger" v-for="error of v$.password.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>
        <div class="field">
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

export default defineComponent({
    setup() {
        let v$ = useVuelidate()
        let email = ref<string>("");
        let password = ref<string>("");
        const router = useRouter();

        const submitSignIn = async () => {
            const isFormCorrect = await v$.value.$validate();
            if (!isFormCorrect) return
            let data = {
                email: email.value,
                password: password.value
            }
            console.log(data)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'เข้าสู้ระบบสำเร็จ',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(()=>{router.push("/")}, 1500);
        }

        return { email, password, v$, submitSignIn }
    },
    validations() {
        return {
            email: {
                required: helpers.withMessage('กรุณากรอกอีเมล', required)
            },
            password: {
                required: helpers.withMessage('กรุณากรอกรหัสผ่าน', required)
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
