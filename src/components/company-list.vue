<template>
    <div class="companys_content px-6 mb-6">
        <div class="columns is-multiline">
            <div class="column is-2 ml-6" v-for="item, index in paginatedItems" :key="index">
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



    <nav class="pagination mt-3 px-6" role="navigation" aria-label="pagination">
        <button class="pagination-previous" :disabled="previousClicked" @click="getPreviousPage()">Previous</button>
        <button class="pagination-next" :disabled="nextPageClicked" @click="getNextPage()">Next page</button>
        <ul class="pagination-list">
            <li v-for="n in countOfPages" :key="n">
                <a v-bind:id="'pageId' + (n)" class="pagination-link" @click="changePage(n)">{{ n
                }}</a>
            </li>

        </ul>
    </nav>
</template>


<script lang="ts">
import { defineComponent, onMounted, ref, onUpdated, ComputedRef, computed } from 'vue'
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

        const nextPageClicked = ref<boolean>(false);
        const previousClicked = ref<boolean>(false);

        const paginatedItems = computed(() => {
            let startItem = (presentPage.value - 1) * props.itemPerEachPage;
            let endItem = startItem + props.itemPerEachPage;
            return props.items.slice(startItem, endItem);
        })

        const countOfPages: ComputedRef<number> = computed(() => {
            return Math.ceil(props.items.length / props.itemPerEachPage)
        })

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


 

        const validatePageCount = () => {
            presentPage.value === countOfPages.value ? nextPageClicked.value = true : nextPageClicked.value = false;
            presentPage.value === 1 ? previousClicked.value = true : previousClicked.value = false;
        }

        const viewConpany = (id:string) => {
            router.push("/companies/"+id)
        }

        return {
            nextPageClicked, previousClicked, getNextPage, getPreviousPage, presentPage, changePage, viewConpany, paginatedItems, countOfPages
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

