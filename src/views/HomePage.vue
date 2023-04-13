<template>
  <div class="container">
    <div class="columns ml-6 mt-5 pl-3 pr-3">

      <div class="column has-background-dark is-2 mr-6 has-text-white box" @click="viewContact()"
        style="cursor: pointer;">
        <p class="is-size-1 has-text-centered">Professor Contact</p>
      </div>

      <div class="column is-10 ml-3 mr-3 ">
        <Carousel :autoplay="1500" :wrapAround="true" style="width: 90%;">
          <Slide v-for="slide in 10" :key="slide">
            <img @click="viewProgram(slide)" class="carousel__item" src="https://www.w3schools.com/w3images/workbench.jpg"
              width="1400">
          </Slide>
          <template #addons>
            <Navigation />
            <Pagination />
          </template>
        </Carousel>
      </div>
    </div>
    <companyList :items="states.companies"></companyList>
  </div>
</template>


<script lang="ts">
import { computed, defineComponent, reactive, unref } from 'vue'
import companyList from '../components/company-list.vue'
import Company from '@/models/Company'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { useRouter } from 'vue-router'
// import { useStore } from 'vuex'
// import User from '@/models/User'

export default defineComponent({
  components: {
    companyList,
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },

  setup() {

    const router = useRouter();
    // const store = useStore();

    // const user = reactive<User>(unref(computed(() => store.getters.user)))




    const states = reactive<{ companies: Company[] }>({
      companies: [
        // { id: 1, name: "Company1", description: "", profile_image: "", background_image: "", video_iframe: "" },
        // { id: 2, name: "Company2", description: "", profile_image: "", background_image: "", video_iframe: "" },
        // { id: 3, name: "Company3", description: "", profile_image: "", background_image: "", video_iframe: "" },
        // { id: 4, name: "Company4", description: "", profile_image: "", background_image: "", video_iframe: "" },
        // { id: 5, name: "Company5", description: "", profile_image: "", background_image: "", video_iframe: "" },
        // { id: 6, name: "Company6", description: "", profile_image: "", background_image: "", video_iframe: "" },
        // { id: 7, name: "Company7", description: "", profile_image: "", background_image: "", video_iframe: "" },
        // { id: 8, name: "Company8", description: "", profile_image: "", background_image: "", video_iframe: "" },
        // { id: 9, name: "Company9", description: "", profile_image: "", background_image: "", video_iframe: "" },
        // { id: 10, name: "Company10", description: "", profile_image: "", background_image: "", video_iframe: "" },
        // { id: 11, name: "Company11", description: "", profile_image: "", background_image: "", video_iframe: "" },
        // { id: 12, name: "Company12", description: "", profile_image: "", background_image: "", video_iframe: "" },
        // { id: 13, name: "Company13", description: "", profile_image: "", background_image: "", video_iframe: "" },
        // { id: 14, name: "Company14", description: "", profile_image: "", background_image: "", video_iframe: "" },
        // { id: 15, name: "Company15", description: "", profile_image: "", background_image: "", video_iframe: "" },
        // { id: 16, name: "Company16", description: "", profile_image: "", background_image: "", video_iframe: "" },
        // { id: 17, name: "Company17", description: "", profile_image: "", background_image: "", video_iframe: "" },
        // { id: 18, name: "Company18", description: "", profile_image: "", background_image: "", video_iframe: "" },
        // { id: 19, name: "Company19", description: "", profile_image: "", background_image: "", video_iframe: "" },
        // { id: 20, name: "Company20", description: "", profile_image: "", background_image: "", video_iframe: "" },
      ]
    });

    const deleteCompany = (index: number) => {
      console.log(index)
      states.companies.splice(index, 1);
    };

    const viewProgram = (id: number) => {
      router.push("/programs/" + id)
    }

    const viewContact = () => {
      router.push("/contact")
    }

    return { states, deleteCompany, viewProgram, viewContact }
  },
})
</script>

<style scoped>
@import '../assets/styles/homepage.css';

.carousel__item {
  border-radius: 8px;
  display: block;
  ;
  border-radius: 15px;
  cursor: pointer;
}


.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}

.box {
  border-radius: 15px;
}
</style>


