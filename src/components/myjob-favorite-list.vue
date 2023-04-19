<template>
    <div class="column ml-6 p-0">
        <div class="card px-5 py-4">
            <div class="job_content p-3" v-for="job, index in paginatedItems" :key="index"
                style="border-top:0.5px solid gray;" @click="viewJob(job.id)">
                <p class="is-size-4 has-text-weight-bold">บริษัท: </p>
                <p class="is-size-4 has-text-weight-bold">ตำแหน่ง: {{ job.name }}</p>
                <div class="columns is-multiline ml-6 mt-1">
                    <div class="column is-6"><i class="pi pi-map-marker"> <span class="is-size-5 pl-4"><b>สถานที่ทำงาน:
                                </b>{{
                                    job.location
                                }}</span></i></div>
                    <div class="column is-6"><i class="pi pi-dollar"> <span class="is-size-5 pl-4"><b>ค่าตอบแทนรายวัน:
                                </b>{{
                                    job.location
                                }}</span></i></div>
                    <div class="column is-6"><i class="pi pi-user"><span class="is-size-5 pl-4"><b>จำนวนคำที่รับ: </b>{{
                        job.capacity
                    }}</span></i></div>
                    <p class="is-size-5 column is-6"><b>รูปแบบการสัมภาษณ์: </b>{{ job.interview }}</p>
                </div>
                <div style="display: flex; flex-direction: row; justify-content: flex-end;">
                    <button class="button mx-4 mb-4 is-danger" @click.stop="removeFavorieJob(job.id)">ลบ</button>
                </div>
            </div>

        </div>

        <nav class="pagination mt-3 pl-6 pr-5" role="navigation" aria-label="pagination">
            <button class="pagination-previous" :disabled="previousClicked" @click="getPreviousPage()">Previous</button>
            <button class="pagination-next" :disabled="nextPageClicked" @click="getNextPage()">Next page</button>
            <ul class="pagination-list">
                <li v-for="n in countOfPages" :key="n">
                    <a v-bind:id="'pageId' + (n)" class="pagination-link" @click="changePage(n)">{{n}}</a>
                </li>

            </ul>
        </nav>
    </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, onUpdated, PropType, reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import Job from '@/models/Job';
import JobFavoriteModel from '@/models/formModels/JobFavoriteModel';
import { def_JobFavorit } from '@/plugins/defaultValue';
import { PORT } from '@/port';
import axios from '@/plugins/axios';

export default defineComponent({
    emits: ['remove'],
    props: {
        items: {
            type: Object as PropType<Job[]>,
            required: true,
        },
        itemPerEachPage: {
            type: Number,
            default: 3
        },
        appicant_id: {
            type: String,
            required: true,
        },
    },
    setup(props, { emit }) {
        const router = useRouter();
        let presentPage = ref<number>(1);
        let pastPage = ref<number>(1);

        const nextPageClicked = ref<boolean>(false);
        const previousClicked = ref<boolean>(false);

        const setJobFavorite = reactive<JobFavoriteModel>(def_JobFavorit)

        onMounted(() => {
            validatePageCount();
        })

        onUpdated(() => {
            document.getElementById('pageId' + presentPage.value)?.classList.add('is-current');
        })

        const getNextPage = () => {
            pastPage.value = presentPage.value;
            presentPage.value += 1;
            validatePageCount()
            document.getElementById('pageId' + presentPage.value)?.classList.add('is-current');
            document.getElementById('pageId' + pastPage.value)?.classList.remove('is-current');
        }

        const changePage = (page: number) => {
            pastPage.value = presentPage.value;
            presentPage.value = page;
            validatePageCount()
            document.getElementById('pageId' + presentPage.value)?.classList.add('is-current');
            document.getElementById('pageId' + pastPage.value)?.classList.remove('is-current');
        }

        const getPreviousPage = () => {
            pastPage.value = presentPage.value;
            presentPage.value -= 1;
            validatePageCount()
            document.getElementById('pageId' + presentPage.value)?.classList.add('is-current');
            document.getElementById('pageId' + pastPage.value)?.classList.remove('is-current');
        }



        const paginatedItems = computed(() => {
            let startItem = (presentPage.value - 1) * props.itemPerEachPage;
            let endItem = startItem + props.itemPerEachPage;
            return props.items.slice(startItem, endItem);
        })

        const countOfPages: ComputedRef<number> = computed(() => {
            return Math.ceil(props.items.length / props.itemPerEachPage)
        })

        const validatePageCount = () => {
            presentPage.value === countOfPages.value ? nextPageClicked.value = true : nextPageClicked.value = false;
            presentPage.value === 1 ? previousClicked.value = true : previousClicked.value = false;
        }

        const viewJob = (id: string) => {
            router.push("/jobs/" + id)
        }

        const removeFavorieJob = (job_id: string) => {
            setJobFavorite.applicant_id = props.appicant_id
            setJobFavorite.job_id = job_id
            axios.post(`${PORT}` + "/applicant/removeMyJobFavorite", setJobFavorite)
            emit('remove', job_id)
        }


        return {
            nextPageClicked, previousClicked, getNextPage, getPreviousPage, presentPage, changePage, router, viewJob, removeFavorieJob, paginatedItems, countOfPages
        }
    },
})
</script>

<style scoped>
.job_content:hover {
    background-color: hsl(0, 0%, 96%);
}
</style>
