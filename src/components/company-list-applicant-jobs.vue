<template>
    <div class="column m-0 p-0">
        <div class="card px-5 py-3">
            <div class="pt-3" style="border-top:0.5px solid gray;" v-for="item, index in paginatedItems" :key="index">

                <p class="is-size-4 has-text-weight-bold p-4">ตำแหน่ง {{ item.job_name }}</p>
                <div class="columns p-4" @click="viewApplicationDetail(item.applicant_id)">
                    <div class="column">
                        <p class="is-size-5 has-text-weight-bold">ตำแหน่ง: {{ item.job_name }}</p>
                    </div>
                    <div class="column">
                        <p class="is-size-5 has-text-weight-bold">วันที่ยื่นสมัคร: {{ item.creation_date }}</p>
                    </div>
                    <div class="column">
                        <p class="is-size-5 has-text-weight-bold">สถานะ: {{ item.state }}</p>
                    </div>
                </div>
                <div style="display: flex; flex-direction: row; justify-content: flex-end;">
                </div>
            </div>
        </div>

        <nav class="pagination mt-3 pl-6 pr-5" role="navigation" aria-label="pagination">
            <button class="pagination-previous" :disabled="previousClicked" @click="getPreviousPage()">Previous</button>
            <button class="pagination-next" :disabled="nextPageClicked" @click="getNextPage()">Next page</button>
            <ul class="pagination-list">
                <li v-for="n in countOfPages" :key="n">
                    <a v-bind:id="'pageId' + (n)" class="pagination-link" @click="changePage(n)">{{ n }}</a>
                </li>

            </ul>
        </nav>
    </div>
</template>

<script lang="ts">
import Swal from 'sweetalert2';
import { computed, ComputedRef, defineComponent, onMounted, onUpdated, PropType, ref } from 'vue'
import ApplicationJob from '@/models/ApplicationJob';
import axios from '@/plugins/axios';
import { PORT } from '@/port';
import { useRouter } from 'vue-router';

export default defineComponent({
    props: {
        items: {
            type: Object as PropType<ApplicationJob[]>,
            required: true,
        },
        itemPerEachPage: {
            type: Number,
            default: 3
        },
        isCancel: {
            type: Boolean,
            default: true
        },
    },
    setup(props, { emit }) {
        const router = useRouter();
        let presentPage = ref<number>(1);
        let pastPage = ref<number>(1);

        const nextPageClicked = ref<boolean>(false);
        const previousClicked = ref<boolean>(false);



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
        const viewApplicationDetail = (id: string) => {
            router.push("/Applicant/" + id)
        }

        return {
            nextPageClicked, previousClicked, getNextPage, getPreviousPage, presentPage, changePage, paginatedItems, countOfPages, viewApplicationDetail
        }
    },
})
</script>
