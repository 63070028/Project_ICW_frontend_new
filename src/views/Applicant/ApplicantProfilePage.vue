<template>
    <div class="columns mt-6">
        <div class="column is-2"></div>
        <div class="tabs is-boxed column is-8">
            <ul>
                <li :class="[select_option === 'user_profile' ? 'is-active':'']" @click="select_option = 'user_profile'">
                    <a>
                        <span>User Profile</span>
                    </a>
                </li>
                <li :class="[select_option === 'resume' ? 'is-active':'']" @click="select_option = 'resume'">
                    <a>
                        <span>Resume</span>
                    </a>
                </li>
                <li :class="[select_option === 'transcript' ? 'is-active':'']" @click="select_option = 'transcript'">
                    <a>
                        <span>Transcript</span>
                    </a>
                </li>
                <li :class="[select_option === 'portfolio' ? 'is-active':'']" @click="select_option = 'portfolio'">
                    <a>
                        <span>Portfolio</span>
                    </a>
                </li>
            </ul>

            <userProfileVue v-if="select_option === 'user_profile'"></userProfileVue>
            <uploadPdfVue :maxSize="100" :upload_category="select_option" v-if="select_option === 'resume'"></uploadPdfVue>
            <uploadPdfVue :maxSize="100" :upload_category="select_option" v-if="select_option === 'transcript'"></uploadPdfVue>
            <uploadPdfVue :maxSize="100" :upload_category="select_option" v-if="select_option === 'portfolio'"></uploadPdfVue>
        </div>
        
        <div class="column is-2"></div>
    </div>
</template>



<script lang="ts">
import { defineComponent, ref } from 'vue'
import userProfileVue from '@/components/user-profile.vue'
import uploadPdfVue from '@/components/upload-pdf.vue'


export default defineComponent({
    components:{
        userProfileVue,
        uploadPdfVue
    },
    setup() {
    
        let select_option  = ref<string>("user_profile")

        return {
            select_option
        }

    },
})
</script>
