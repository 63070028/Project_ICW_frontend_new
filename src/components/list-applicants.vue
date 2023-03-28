<template>
    <div class="applicants_content">
        <div class="columns is-multiline">
            <div class="column is-12" v-for="item, index in states.addBlogsPageList" :key="index">
                <!-- <button class="button" @click="deleteItem(index)">Del</button> -->
                <div class="card">
                    <div class="card-content">
                        <div class="card-content">  
                            <div class="media-content">
                                <p class="title has-text-centered is-size-4">{{ item.fullName }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <nav class="pagination m-6 is-medium " role="navigation" aria-label="pagination">
        <button class="pagination-previous" :disabled="previousClicked" @click="getPreviousPage()">Previous</button>
        <button class="pagination-next" :disabled="nextPageClicked" @click="getNextPage()">Next page</button>
        <ul class="pagination-list">
            <li v-for="index in states.countOfPages" :key="index">
                <a v-bind:id="'pageId' + (index + 1)" class="pagination-link" @click="changePage(index + 1)">{{ index + 1 }}</a>
            </li>

        </ul>
    </nav>
</template>


<script lang="ts">
import { defineComponent, onMounted, reactive, ref, onUpdated } from 'vue'
import type { PropType } from 'vue'
import Applicant from '@/models/Applicant';

export default defineComponent({
    props: {
        items: {
            type: Object as PropType<Applicant[]>,
            required: true
        },
        itemPerEachPage: {
            type: Number,
            default: 6
        }
    },
    emits: ['deleteItem'],
    setup(props) {

        let presentPage = ref<number>(1);
        let pastPage = ref<number>(1);
        const states = reactive<{ countOfPages: number[], addBlogsPageList: Applicant[] }>(
            {
                countOfPages: [],
                addBlogsPageList: [],
            }
        )
        const nextPageClicked = ref<boolean>(false);
        const previousClicked = ref<boolean>(false);


        // const deleteItem = (index: number) => {
        //     emit('deleteItem', index);
        // }

        onMounted(() => {
            loadMyPaginationList();
            states.countOfPages = Array.from(Array(Math.ceil(props.items.length / props.itemPerEachPage)).keys());
        })

        onUpdated(() => {
            document.getElementById('pageId' + presentPage.value)?.classList.add('is-current');
        })


        const getNextPage = () => {
            pastPage.value = presentPage.value;
            presentPage.value += 1;
            loadMyPaginationList();
            document.getElementById('pageId'+presentPage.value)?.classList.add('is-current'); 
            document.getElementById('pageId'+pastPage.value)?.classList.remove('is-current');
        }

        const changePage = (page: number) => {
            pastPage.value = presentPage.value;
            presentPage.value = page;
            loadMyPaginationList();
            document.getElementById('pageId'+presentPage.value)?.classList.add('is-current'); 
            document.getElementById('pageId'+pastPage.value)?.classList.remove('is-current');
        }

        const getPreviousPage = () => {
            pastPage.value = presentPage.value;
            presentPage.value -= 1;
            loadMyPaginationList();
            document.getElementById('pageId'+presentPage.value)?.classList.add('is-current'); 
            document.getElementById('pageId'+pastPage.value)?.classList.remove('is-current');
        }



        const loadMyPaginationList = () => {
            let startBlog = (presentPage.value - 1) * props.itemPerEachPage;
            let endBlog = startBlog + props.itemPerEachPage;
            states.addBlogsPageList = props.items.slice(startBlog, endBlog);
        }


        return {
             nextPageClicked, previousClicked, getNextPage, getPreviousPage, states, presentPage, changePage
        }
    }

})
</script>

<style scoped>
.applicants_content {
    background-color: white;
}

.logo {
    margin-bottom: 1em;
}

.content {
    height: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

