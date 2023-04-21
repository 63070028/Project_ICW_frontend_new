<template>
    <div class="column ml-6 p-0">

        <div class="tabs">
            <ul>
                <li :class="[select_option_display === 'jobs' ? 'is-active' : '']" @click="select_option_display = 'jobs'">
                    <a>งาน</a>
                </li>
                <li :class="[select_option_display === 'programs' ? 'is-active' : '']"
                    @click="select_option_display = 'programs'"><a>โครงการ</a></li>
            </ul>
        </div>

        <myjobApplicationJobList v-if="select_option_display === 'jobs'" :items="myApplications.applicationJob" @cancelApplicationJob="updateMyApplicationJob($event)"
            :isCancel="enableCancel">
        </myjobApplicationJobList>
        <myjobApplicationProgramList v-if="select_option_display === 'programs'" :items="myApplications.applicationProgram" @cancelApplicationProgram="updateMyApplicationProgram($event)"
            :isCancel="enableCancel">
        </myjobApplicationProgramList>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import Applications from '@/models/Applications';
import myjobApplicationJobList from './myjob-applicationJob-list.vue';
import myjobApplicationProgramList from './myjob-applicationProgram-list.vue';

export default defineComponent({
    emits:["cancelApplicationJob", "cancelApplicationProgram"],
    props: {
        myApplications: {
            type: Object as PropType<Applications>,
            default: () => {
                return {
                    applicationJob: [],
                    applicationProgram: []
                }
            }
        },
        enableCancel: {
            type: Boolean,
            required: true
        }
    },
    components: {
        myjobApplicationJobList,
        myjobApplicationProgramList
    },
    setup(props, {emit}) {

        const select_option_display = ref<string>('jobs');

        
        const updateMyApplicationJob = (id:string) => {
            emit("cancelApplicationJob", id)
        }

        const updateMyApplicationProgram = (id:string) => {
            emit("cancelApplicationProgram", id)
        }

        return {
            select_option_display, updateMyApplicationJob, updateMyApplicationProgram
        }
    },
})
</script>
