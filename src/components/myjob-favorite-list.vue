<template>
    <div class="column ml-6 p-0">
        <div class="card px-5 py-4">
            <div class="job_content p-3" v-for="job, index in states.addItemsPageList" :key="index"
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
                    <button class="button mx-4 mb-4 is-danger"  @click.stop="removeFavorieJob()">ลบ</button>
                </div>
            </div>

        </div>

        <nav class="pagination mt-3 pl-6 pr-5" role="navigation" aria-label="pagination">
            <button class="pagination-previous" :disabled="previousClicked" @click="getPreviousPage()">Previous</button>
            <button class="pagination-next" :disabled="nextPageClicked" @click="getNextPage()">Next page</button>
            <ul class="pagination-list">
                <li v-for="index in states.countOfPages" :key="index">
                    <a v-bind:id="'pageId' + (index + 1)" class="pagination-link" @click="changePage(index + 1)">{{ index +
                        1
                    }}</a>
                </li>

            </ul>
        </nav>
    </div>
</template>

<script lang="ts">
import Swal from 'sweetalert2';
import { defineComponent, onMounted, onUpdated, reactive, ref } from 'vue'
import { useRouter } from 'vue-router';

export default defineComponent({
    props: {
        items: {
            type: Array,
            required: true,
            default: () => []
        },
        itemPerEachPage: {
            type: Number,
            default: 3
        }
    },
    setup(props) {
        const router = useRouter();
        let presentPage = ref<number>(1);
        let pastPage = ref<number>(1);

        const states = reactive<{ countOfPages: number[], addItemsPageList: any[] }>(
            {
                countOfPages: [],
                addItemsPageList: [],
            }
        )

        const nextPageClicked = ref<boolean>(false);
        const previousClicked = ref<boolean>(false);

        onMounted(() => {
            loadMyPaginationList();
            states.countOfPages = Array.from(Array(Math.ceil(props.items.length / props.itemPerEachPage)).keys());
        })

        onUpdated(() => {
            loadMyPaginationList();
            document.getElementById('pageId' + presentPage.value)?.classList.add('is-current');
        })

        const getNextPage = () => {
            pastPage.value = presentPage.value;
            presentPage.value += 1;
            loadMyPaginationList();
            document.getElementById('pageId' + presentPage.value)?.classList.add('is-current');
            document.getElementById('pageId' + pastPage.value)?.classList.remove('is-current');
        }

        const changePage = (page: number) => {
            pastPage.value = presentPage.value;
            presentPage.value = page;
            loadMyPaginationList();
            document.getElementById('pageId' + presentPage.value)?.classList.add('is-current');
            document.getElementById('pageId' + pastPage.value)?.classList.remove('is-current');
        }

        const getPreviousPage = () => {
            pastPage.value = presentPage.value;
            presentPage.value -= 1;
            loadMyPaginationList();
            document.getElementById('pageId' + presentPage.value)?.classList.add('is-current');
            document.getElementById('pageId' + pastPage.value)?.classList.remove('is-current');
        }



        const loadMyPaginationList = () => {
            let startItem = (presentPage.value - 1) * props.itemPerEachPage;
            let endItem = startItem + props.itemPerEachPage;
            states.addItemsPageList = props.items.slice(startItem, endItem);
            validatePageCount();
        }

        const validatePageCount = () => {
            presentPage.value === states.countOfPages.length ? nextPageClicked.value = true : nextPageClicked.value = false;
            presentPage.value === 1 ? previousClicked.value = true : previousClicked.value = false;
        }

        const viewJob = (id: number) => {
            router.push("/jobs/" + id)
        }

        const removeFavorieJob = () => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'ดำเนิดการสำเร็จ',
                showConfirmButton: false,
                timer: 1500
            })
        }

        return {
            nextPageClicked, previousClicked, getNextPage, getPreviousPage, states, presentPage, changePage, router, viewJob, removeFavorieJob
        }
    },
})
</script>

<style scoped>
.job_content:hover {
    background-color: hsl(0, 0%, 96%);
}
</style>
