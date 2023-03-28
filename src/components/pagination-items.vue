<template>
    <div class="companys_content p-3">
        <div class="columns is-multiline">
            <div class="column is-2 ml-6" v-for="item, index in states.addBlogsPageList" :key="index">
                <!-- <button class="button" @click="deleteItem(index)">Del</button> -->
                <div class="card" @click="viewConpany(item.id)">
                    <div class="card-content">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media-content">
                                <p class="title has-text-centered is-size-6">{{ item.name }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>



    <nav class="pagination mt-3 pl-6 pr-5" role="navigation" aria-label="pagination">
        <button class="pagination-previous" :disabled="previousClicked" @click="getPreviousPage()">Previous</button>
        <button class="pagination-next" :disabled="nextPageClicked" @click="getNextPage()">Next page</button>
        <ul class="pagination-list">
            <li v-for="index in states.countOfPages" :key="index">
                <a v-bind:id="'pageId' + (index + 1)" class="pagination-link" @click="changePage(index + 1)">{{ index + 1
                }}</a>
            </li>

        </ul>
    </nav>
</template>


<script lang="ts">
import { defineComponent, onMounted, reactive, ref, onUpdated } from 'vue'
import type { PropType } from 'vue'
import Company from '@/models/Company';
import { useRouter } from 'vue-router';

export default defineComponent({
    props: {
        items: {
            type: Object as PropType<Company[]>,
            required: true
        },
        itemPerEachPage: {
            type: Number,
            default: 10
        }
    },
    emits: ['deleteItem'],
    setup(props) {

        const router = useRouter();

        let presentPage = ref<number>(1);
        let pastPage = ref<number>(1);
        const states = reactive<{ countOfPages: number[], addBlogsPageList: Company[] }>(
            {
                countOfPages: [],
                addBlogsPageList: [],
            }
        )
        // let countOfPages = reactive<number[]>([]);
        // let addBlogsPageList = reactive<Company[]>([]);
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
            let startBlog = (presentPage.value - 1) * props.itemPerEachPage;
            let endBlog = startBlog + props.itemPerEachPage;
            states.addBlogsPageList = props.items.slice(startBlog, endBlog);
            validatePageCount();
        }

        const validatePageCount = () => {
            presentPage.value === states.countOfPages.length ? nextPageClicked.value = true : nextPageClicked.value = false;
            presentPage.value === 1 ? previousClicked.value = true : previousClicked.value = false;
        }

        const viewConpany = (id:number) => {
            router.push("/companies/"+id)
        }

        return {
            nextPageClicked, previousClicked, getNextPage, getPreviousPage, states, presentPage, changePage, viewConpany
        }
    }

})
</script>

<style scoped>
.companys_content {
    background-color: white;
    cursor: pointer;
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

