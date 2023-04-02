<template>
    <div class="container">
        <div class="columns mt-6">
        <div class="column has-background-light is-3 pt-3 pb-3 card">
            <div :class="['select_option', select_option === 'application'?['has-background-primary','has-text-white']:'']"><p class="has-text-centered is-size-5 p-3 " @click="select_option = 'application'">งานกำลังที่ยื่นสมัคร</p></div>
            <div :class="['select_option', select_option === 'favorite'?['has-background-primary','has-text-white']:'']"><p class="has-text-centered is-size-5 p-3 " @click="select_option = 'favorite'">งานโปรด</p></div>
            <div :class="['select_option', select_option === 'history'?['has-background-primary','has-text-white']:'']"><p class="has-text-centered is-size-5 p-3 " @click="select_option = 'history'">งานที่เคยยื่น</p></div>
        </div>
        <myjobApplicationList :items="[1,2,3,4]" v-if="select_option === 'application'"></myjobApplicationList>
        <myjobFavoriteListVue :items="[1,2,3,4]" v-if="select_option === 'favorite'"></myjobFavoriteListVue>
        <myjobHistoryList :items="[1,2,3,4]" v-if="select_option === 'history'"></myjobHistoryList>
    </div>
    </div>
</template>



<script lang="ts">
import { defineComponent, ref } from 'vue'
import myjobApplicationList from '@/components/myjob-application-list.vue';
import myjobFavoriteListVue from '@/components/myjob-favorite-list.vue';
import myjobHistoryList from '@/components/myjob-history-list.vue';
export default defineComponent({
    components:{
        myjobApplicationList,
        myjobFavoriteListVue,
        myjobHistoryList
    },
    setup() {

        const select_option = ref<string>('application')

        return{
            select_option
        }
    },
})
</script>

<style scoped>
.select_option{
    cursor: pointer;
}
.select_option:hover{
    background-color: rgb(255, 255, 255);
}
</style>
