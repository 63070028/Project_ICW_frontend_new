<template>
   
    <h1 class="is-size-1 has-text-centered mt-3">Sign Up</h1>
    <div class="signup_content p-6 ">
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
        <applicantSignupVue v-if="select_role === 'applicant'"></applicantSignupVue>
        <companySignupVue v-if="select_role === 'company'"></companySignupVue>
    </div>
</template>


<script>
import applicantSignupVue from '@/components/applicant-signup.vue'
import companySignupVue from '@/components/company-signup.vue'
export default {
    name: "SignUp",
    components: {
        applicantSignupVue,
        companySignupVue
    },
    data() {
        return {
            select_role: "applicant",
        }
    },

    methods: {
        siwtchApplicant() {
            this.select_role = "applicant";
        },
        siwtchCompany(){
            this.select_role = "company";
        }
    }



}
</script>

<style scoped>@import '../assets/styles/signup.css';</style>