<template>
    <div class="container card p-6 mt-6">
        <p class="is-size-1 has-text-centered ">รายชื่ออาจารย์</p>
        <div class="columns is-multiline mt-6">
            <div class="column is-3 m-6 has-background-grey-lighter p-0">
                <img class="image_profile"
                    src="https://www.it.kmitl.ac.th/wp-content/uploads/2017/12/Boonprasert-768x768.jpg">
                <div class="px-3">
                    <p class="is-size-5 has-text-weight-semibold">ผศ.ดร. บุญประเสริฐ สุรักษ์รัตนสกุล
                    </p>
                    <p class="is-size-5 has-text-weight-medium">boonprasert@it.kmitl.ac.th</p>
                    <p class="is-size-5 has-text-weight-medium">Office: 522</p>
                </div>
            </div>
            <div class="column is-3 m-6 has-background-grey-lighter p-0">
                <img class="image_profile"
                    src="https://www.it.kmitl.ac.th/wp-content/uploads/2017/12/Pattanapong-768x768.jpg">
                <div class="px-3">
                    <p class="is-size-5 has-text-weight-semibold">ดร. พัฒนพงษ์ ฉันทมิตรโอภาส</p>
                    <p class="is-size-5 has-text-weight-medium">pattanapong@it.kmitl.ac.th</p>
                    <p class="is-size-5 has-text-weight-medium">Office: 610</p>
                </div>
            </div>
            <div class="column is-3 m-6 has-background-grey-lighter p-0">
                <img class="image_profile" src="https://www.it.kmitl.ac.th/wp-content/uploads/2018/03/Lapas-768x768.jpg">
                <div class="px-3">
                    <p class="is-size-5 has-text-weight-semibold">ผศ.ดร. ลภัส ประดิษฐ์ทัศนีย์</p>
                    <p class="is-size-5 has-text-weight-medium">lapas@it.kmitl.ac.th</p>
                    <p class="is-size-5 has-text-weight-medium">Office: 525</p>
                </div>
            </div>
        </div>
    </div>
</template>



<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {

        return {

        }
    },
})
</script>

<style scoped>
.image_profile {
    height: 320px;
}
</style>
