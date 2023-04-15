<template>
    <div class="p-6 card">
        <fieldset :disabled="!modify_profile">

            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">ชื่อ</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <p class="control ">
                            <input class="input" type="text" v-model="v$.f_firstName.$model">
                        </p>
                        <div class="has-text-danger" v-for="error of v$.f_firstName.$errors" :key="error.$uid">
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>
                    </div>
                    <div class="field">
                        <p class="control">
                            <input class="input" type="text" v-model="v$.f_lastName.$model">
                        </p>
                        <div class="has-text-danger" v-for="error of v$.f_lastName.$errors" :key="error.$uid">
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">อีเมล</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <input class="input" type="email" v-model="v$.f_email_profile.$model">
                            <div class="has-text-danger" v-for="error of v$.f_email_profile.$errors" :key="error.$uid">
                                <div class="error-msg">{{ error.$message }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">วันเกิด</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <input class="input" type="date" v-model="v$.f_birthDate.$model">
                            <div class="has-text-danger" v-for="error of v$.f_birthDate.$errors" :key="error.$uid">
                                <div class="error-msg">{{ error.$message }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="field is-horizontal">
                <div class="field-label">
                    <label class="label">เพศ</label>
                </div>
                <div class="field-body">
                    <div class="field is-narrow">
                        <div class="control">
                            <label class="radio">
                                <input type="radio" value="male" v-model="v$.f_gender.$model">
                                ชาย
                            </label>
                            <label class="radio">
                                <input type="radio" value="female" v-model="v$.f_gender.$model">
                                หญิง
                            </label>
                        </div>
                        <div class="has-text-danger" v-for="error of v$.f_gender.$errors" :key="error.$uid">
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>
                    </div>
                </div>
            </div>



            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">ที่อยู่</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <textarea class="textarea" v-model="v$.f_address.$model"></textarea>
                            <div class="has-text-danger" v-for="error of v$.f_address.$errors" :key="error.$uid">
                                <div class="error-msg">{{ error.$message }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">เบอร์ติดต่อ</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <input class="input" type="text" v-model="v$.f_phone.$model">
                            <div class="has-text-danger" v-for="error of v$.f_phone.$errors" :key="error.$uid">
                                <div class="error-msg">{{ error.$message }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </fieldset>

        <div class="mt-6 modify_profile">
            <button v-show="!modify_profile" class="button is-medium ml-2 is-info"
                @click="modify_profile = !modify_profile">แก้ไข</button>
            <button v-show="modify_profile" class="button is-medium ml-2 is-success" @click="saveProfile()">บันทึก</button>
            <button v-show="modify_profile" class="button is-medium ml-2 is-danger" @click="resetProfile()">ยกเลิก</button>
        </div>
    </div>
</template>



<script lang="ts">
import Swal from 'sweetalert2';
import { defineComponent, reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import Applicant from '@/models/Applicant';
import axios from '@/plugins/axios';
import { PORT } from '@/port';
export default defineComponent({
    emits: ['changeProfile'],
    props: {
        id: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email_profile: {
            type: String,
            required: true
        },
        birthDate: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        }
    },

    setup(props, { emit }) {

        const modify_profile = ref<boolean>(false);
        const v$ = useVuelidate();

        const f_firstName = ref<string>(props.firstName);
        const f_lastName = ref<string>(props.lastName);
        const f_email_profile = ref<string>(props.email_profile);
        const f_birthDate = ref<string>(props.birthDate);
        const f_gender = ref<string>(props.gender);
        const f_address = ref<string>(props.address);
        const f_phone = ref<string>(props.phone);
        const f_state = ref<string>(props.state);

        const editForm = reactive<Applicant>({
            id: "",
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
            state: ""
        })

        const saveProfile = async () => {
            const isFormCorrect = await v$.value.$validate();
            if (!isFormCorrect) return

            editForm.id = props.id;
            editForm.firstName = f_firstName.value;
            editForm.lastName = f_lastName.value;
            editForm.email_profile = f_email_profile.value;
            editForm.birthDate = f_birthDate.value;
            editForm.gender = f_gender.value;
            editForm.address = f_address.value;
            editForm.phone = f_phone.value;
            editForm.state = "on"

            await axios.post(`${PORT}`+"/applicant/editProfile", editForm).then(res=>{
                console.log(res.data.message)
                emit('changeProfile', editForm)
            })
            // editForm.resume = 
            // editForm.transcript =
            // editForm.portfolio =
            // editForm.state;

            //api post applicant/edit  form editForm
            //update this page

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Success',
                showConfirmButton: false,
                timer: 1500
            })

            setTimeout(() => {
                modify_profile.value = !modify_profile.value;
            });
        }

        const resetProfile = () => {
            modify_profile.value = !modify_profile.value;
            f_firstName.value = props.firstName;
            f_lastName.value = props.lastName;
            f_email_profile.value = props.email_profile;
            f_birthDate.value = props.birthDate;
            f_gender.value = props.gender;
            f_address.value = props.address;
            f_phone.value = props.phone;
            f_state.value = props.state;
        }

        return {
            modify_profile, v$,
            f_firstName, f_lastName, f_email_profile, f_birthDate, f_gender, f_address, f_phone, f_state,
            resetProfile, saveProfile, editForm
        }
    },
    validations() {
        return {
            f_firstName: {
                required: helpers.withMessage('กรุณากรอกข้อมูล', required)
            },
            f_lastName: {
                required: helpers.withMessage('กรุณากรอกข้อมูล', required)
            },
            f_email_profile: {
                required: helpers.withMessage('กรุณากรอกข้อมูล', required)
            },
            f_birthDate: {
                required: helpers.withMessage('กรุณากรอกข้อมูล', required)
            },
            f_gender: {
                required: helpers.withMessage('กรุณากรอกข้อมูล', required)
            },
            f_address: {
                required: helpers.withMessage('กรุณากรอกข้อมูล', required)
            },
            f_phone: {
                required: helpers.withMessage('กรุณากรอกข้อมูล', required)
            }
        }
    }
})
</script>

<style scoped>
.modify_profile {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}
</style>
