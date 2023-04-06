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
                            <input class="input" type="text">
                        </p>
                    </div>
                    <div class="field">
                        <p class="control">
                            <input class="input" type="text">
                        </p>
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
                            <input class="input" type="email">
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
                            <input class="input" type="date">
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
                                <input type="radio">
                                ชาย
                            </label>
                            <label class="radio">
                                <input type="radio">
                                หญิง
                            </label>
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
                            <textarea class="textarea"></textarea>
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
                            <input class="input" type="text">
                        </div>
                    </div>
                </div>
            </div>

        </fieldset>
    </div>
</template>



<script lang="ts">
import Swal from 'sweetalert2';
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {

        let modify_profile = ref<boolean>(false);

        const saveProfile = () => {

            //api
            //update this page

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Success',
                showConfirmButton: false,
                timer: 1500
            })

            setTimeout(()=>{
                modify_profile.value = !modify_profile.value;
            });
        }

        return {
            modify_profile, saveProfile
        }
    },
})
</script>

<style scoped>
.modify_profile {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}
</style>
