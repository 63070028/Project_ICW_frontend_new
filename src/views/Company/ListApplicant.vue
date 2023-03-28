<template>
  <div>
    
    <listApplicants :items="states.applicants"></listApplicants>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import listApplicants from "@/components/list-applicants.vue";
import Applicant from "@/models/Applicant"


export default defineComponent({
  components: {
    listApplicants,
  },
  setup() {
    const states = reactive<{ applicants: Applicant[] }>({
      applicants: [
        {id: 1,fullName: "AAA AAA",position: "XXXX",email: "XXX@gmail.com",birthDate: "xx-xx-xxxx",gender: "Male",phone: "xxx-xxxxxxx",},
        {id: 2,fullName: "AAA AAA",position: "XXXX",email: "XXX@gmail.com",birthDate: "xx-xx-xxxx",gender: "Male",phone: "xxx-xxxxxxx",},
        {id: 3,fullName: "AAA AAA",position: "XXXX",email: "XXX@gmail.com",birthDate: "xx-xx-xxxx",gender: "Male",phone: "xxx-xxxxxxx",},
        {id: 1,fullName: "AAA AAA",position: "XXXX",email: "XXX@gmail.com",birthDate: "xx-xx-xxxx",gender: "Male",phone: "xxx-xxxxxxx",},
        {id: 2,fullName: "AAA AAA",position: "XXXX",email: "XXX@gmail.com",birthDate: "xx-xx-xxxx",gender: "Male",phone: "xxx-xxxxxxx",},
        {id: 3,fullName: "AAA AAA",position: "XXXX",email: "XXX@gmail.com",birthDate: "xx-xx-xxxx",gender: "Male",phone: "xxx-xxxxxxx",},
        {id: 1,fullName: "AAA AAA",position: "XXXX",email: "XXX@gmail.com",birthDate: "xx-xx-xxxx",gender: "Male",phone: "xxx-xxxxxxx",},
        {id: 2,fullName: "AAA AAA",position: "XXXX",email: "XXX@gmail.com",birthDate: "xx-xx-xxxx",gender: "Male",phone: "xxx-xxxxxxx",},
        {id: 3,fullName: "AAA AAA",position: "XXXX",email: "XXX@gmail.com",birthDate: "xx-xx-xxxx",gender: "Male",phone: "xxx-xxxxxxx",},
        {id: 1,fullName: "AAA AAA",position: "XXXX",email: "XXX@gmail.com",birthDate: "xx-xx-xxxx",gender: "Male",phone: "xxx-xxxxxxx",},
        {id: 2,fullName: "AAA AAA",position: "XXXX",email: "XXX@gmail.com",birthDate: "xx-xx-xxxx",gender: "Male",phone: "xxx-xxxxxxx",},
        {id: 3,fullName: "AAA AAA",position: "XXXX",email: "XXX@gmail.com",birthDate: "xx-xx-xxxx",gender: "Male",phone: "xxx-xxxxxxx",},
        {id: 1,fullName: "AAA AAA",position: "XXXX",email: "XXX@gmail.com",birthDate: "xx-xx-xxxx",gender: "Male",phone: "xxx-xxxxxxx",},
        {id: 2,fullName: "AAA AAA",position: "XXXX",email: "XXX@gmail.com",birthDate: "xx-xx-xxxx",gender: "Male",phone: "xxx-xxxxxxx",},
        {id: 3,fullName: "AAA AAA",position: "XXXX",email: "XXX@gmail.com",birthDate: "xx-xx-xxxx",gender: "Male",phone: "xxx-xxxxxxx",},
        {id: 1,fullName: "AAA AAA",position: "XXXX",email: "XXX@gmail.com",birthDate: "xx-xx-xxxx",gender: "Male",phone: "xxx-xxxxxxx",},
        {id: 2,fullName: "AAA AAA",position: "XXXX",email: "XXX@gmail.com",birthDate: "xx-xx-xxxx",gender: "Male",phone: "xxx-xxxxxxx",},
        {id: 3,fullName: "AAA AAA",position: "XXXX",email: "XXX@gmail.com",birthDate: "xx-xx-xxxx",gender: "Male",phone: "xxx-xxxxxxx",},
        {id: 1,fullName: "AAA AAA",position: "XXXX",email: "XXX@gmail.com",birthDate: "xx-xx-xxxx",gender: "Male",phone: "xxx-xxxxxxx",},
        {id: 2,fullName: "AAA AAA",position: "XXXX",email: "XXX@gmail.com",birthDate: "xx-xx-xxxx",gender: "Male",phone: "xxx-xxxxxxx",},
        {id: 3,fullName: "AAA AAA",position: "XXXX",email: "XXX@gmail.com",birthDate: "xx-xx-xxxx",gender: "Male",phone: "xxx-xxxxxxx",},
        {id: 1,fullName: "AAA AAA",position: "XXXX",email: "XXX@gmail.com",birthDate: "xx-xx-xxxx",gender: "Male",phone: "xxx-xxxxxxx",},
        {id: 2,fullName: "AAA AAA",position: "XXXX",email: "XXX@gmail.com",birthDate: "xx-xx-xxxx",gender: "Male",phone: "xxx-xxxxxxx",},
        {id: 3,fullName: "AAA AAA",position: "XXXX",email: "XXX@gmail.com",birthDate: "xx-xx-xxxx",gender: "Male",phone: "xxx-xxxxxxx",},
      ],
    });
      return { states };
  },
});
</script>


