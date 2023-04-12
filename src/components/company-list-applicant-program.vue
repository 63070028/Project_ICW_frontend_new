<template>
  <div class="column m-0 p-0">
    <div class="card px-5 py-3">
      <div
        class="pt-3"
        style="border-top: 0.5px solid gray"
        v-for="(item, index) in states.addItemsPageList"
        :key="index"
      >
        <div @click="viewApplicant(item.id)">
          <p class="is-size-4 has-text-weight-bold p-4">
            {{ item.id }}. {{ item.firstName }} {{ item.lastName }}
          </p>
          <div class="columns p-4">
            <div class="column">
              <p class="is-size-5 has-text-weight-bold">
                ตำแหน่ง: {{ item.job_title }}
              </p>
            </div>
            <div class="column">
              <p class="is-size-5 has-text-weight-bold">วันที่ยื่นสมัคร:</p>
            </div>
            <div class="column">
              <p class="is-size-5 has-text-weight-bold">
                สถานะ: {{ item.status }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <nav
      class="pagination mt-3 pl-6 pr-5"
      role="navigation"
      aria-label="pagination"
    >
      <button
        class="pagination-previous"
        :disabled="previousClicked"
        @click="getPreviousPage()"
      >
        Previous
      </button>
      <button
        class="pagination-next"
        :disabled="nextPageClicked"
        @click="getNextPage()"
      >
        Next page
      </button>
      <ul class="pagination-list">
        <li v-for="index in states.countOfPages" :key="index">
          <a
            v-bind:id="'pageId' + (index + 1)"
            class="pagination-link"
            @click="changePage(index + 1)"
            >{{ index + 1 }}</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUpdated,
  reactive,
  ref,
  PropType,
} from "vue";
import ApplicationProgram from "@/models/ApplicationProgram";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    items: {
      type: Object as PropType<ApplicationProgram[]>,
      required: true,
    },
    itemPerEachPage: {
      type: Number,
      default: 3,
    },
    isCancel: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const router = useRouter();
    let presentPage = ref<number>(1);
    let pastPage = ref<number>(1);

    const states = reactive<{
      countOfPages: number[];
      addItemsPageList: ApplicationProgram[];
    }>({
      countOfPages: [],
      addItemsPageList: [],
    });

    const nextPageClicked = ref<boolean>(false);
    const previousClicked = ref<boolean>(false);

    onMounted(() => {
      loadMyPaginationList();
      states.countOfPages = Array.from(
        Array(Math.ceil(props.items.length / props.itemPerEachPage)).keys()
      );
    });

    onUpdated(() => {
      loadMyPaginationList();
      document
        .getElementById("pageId" + presentPage.value)
        ?.classList.add("is-current");
    });

    const getNextPage = () => {
      pastPage.value = presentPage.value;
      presentPage.value += 1;
      loadMyPaginationList();
      document
        .getElementById("pageId" + presentPage.value)
        ?.classList.add("is-current");
      document
        .getElementById("pageId" + pastPage.value)
        ?.classList.remove("is-current");
    };

    const changePage = (page: number) => {
      pastPage.value = presentPage.value;
      presentPage.value = page;
      loadMyPaginationList();
      document
        .getElementById("pageId" + presentPage.value)
        ?.classList.add("is-current");
      document
        .getElementById("pageId" + pastPage.value)
        ?.classList.remove("is-current");
    };

    const getPreviousPage = () => {
      pastPage.value = presentPage.value;
      presentPage.value -= 1;
      loadMyPaginationList();
      document
        .getElementById("pageId" + presentPage.value)
        ?.classList.add("is-current");
      document
        .getElementById("pageId" + pastPage.value)
        ?.classList.remove("is-current");
    };

    const loadMyPaginationList = () => {
      let startItem = (presentPage.value - 1) * props.itemPerEachPage;
      let endItem = startItem + props.itemPerEachPage;
      states.addItemsPageList = props.items.slice(startItem, endItem);
      validatePageCount();
    };

    const validatePageCount = () => {
      presentPage.value === states.countOfPages.length
        ? (nextPageClicked.value = true)
        : (nextPageClicked.value = false);
      presentPage.value === 1
        ? (previousClicked.value = true)
        : (previousClicked.value = false);
    };
    const viewApplicant = (id:string) => {
      router.push("/applicant/"+id)
    }
    return {
      nextPageClicked,
      previousClicked,
      getNextPage,
      getPreviousPage,
      states,
      presentPage,
      changePage,
      viewApplicant
    };
  },
});
</script>
