<template>
    <div class="column m-0 p-0">
        <div class="card px-5 py-4">
            <div class="pt-3" style="border-top:0.5px solid gray;" v-for="item, index in states.addItemsPageList"
                :key="index">
                <!-- <div class="columns">
                    <div class="column is-7">
                        <p class="is-size-4 has-text-weight-bold p-4">บริษัท ...</p>
                    </div>
                    <div class="column">
                        <p class="is-size-4 has-text-weight-bold p-4">โครงการ ...</p>
                    </div>
                </div> -->
                <p class="is-size-4 has-text-weight-bold p-3">บริษัท ...</p>
                <p class="is-size-4 has-text-weight-bold p-3">โครงการ ...</p>
                <div class="columns p-4">
                    <div class="column">
                        <p class="is-size-5 has-text-weight-bold">ตำแหน่ง:</p>
                    </div>
                    <div class="column">
                        <p class="is-size-5 has-text-weight-bold">วันที่ยื่นสมัคร:</p>
                    </div>
                    <div class="column">
                        <p class="is-size-5 has-text-weight-bold">สถานะ:</p>
                    </div>
                </div>
                <div style="display: flex; flex-direction: row; justify-content: flex-end;">
                    <button v-if="isCancel" class="button mx-4 mb-4 is-danger" @click="cancelApplication()">ยกเลิก</button>
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
// import ApplicationJob from '@/models/ApplicationJob';

export default defineComponent({
    props: {
        items: {
            type: Array,
            // type: Object as PropType<ApplicationJob[]>,
            required: true,
            default: () => []
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
    setup(props) {

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

        const cancelApplication = () => {
            // const data = {
            //     applicationProgram_id: 'xxx',
            //     status: 'cancel'
            // }

            //api post change ApplicationProgram status is pending => cancel

            Swal.fire({
                title: 'Are you sure?',
                text: "คุณแน่ใจแล้วใช่ไหมที่ยกเลิกใบสมัคร",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'hsl(141, 50%, 48%)',
                cancelButtonColor: 'hsl(348, 100%, 61%)',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'ดำเนิดการสำเร็จ',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        }

        return {
            nextPageClicked, previousClicked, getNextPage, getPreviousPage, states, presentPage, changePage, cancelApplication
        }
    },
})
</script>
