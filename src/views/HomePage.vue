<template>
  <div class="container">
    <div class="columns ml-6 mt-5 pl-3 pr-3">

      <div class="column has-background-dark is-2 mr-6 has-text-white box" @click="viewContact()"
        style="cursor: pointer;">
        <p class="is-size-1 has-text-centered">Professor Contact</p>
      </div>

      <div class="column is-10 ml-3 mr-3 ">
        <Carousel :autoplay="1500" :wrapAround="true" style="width: 90%;">
          <!-- //Array state.progarms -->
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
import { computed, defineComponent, onMounted, reactive, unref } from 'vue'
import companyList from '../components/company-list.vue'
import Company from '@/models/Company'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { useRouter } from 'vue-router'
import Program from '@/models/Program'
import { useStore } from 'vuex'
import axios from "@/plugins/axios"
import { PORT } from '@/port'
import User from '@/models/User'


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

    const store = useStore();

    const user = reactive<User>(store.state.user)

    const states = reactive<{ companies: Company[], programs: Program[] }>({
      companies: [
        { id: "xxxx-xxxx-xxxx-xxxx", name: "Company1", description: "xxxxxx", profile_image: "", background_image: "", video_iframe: "", state: "no" },
      ],
      programs: [

      ]
    });

    onMounted(async () => {
        await axios.get(`${PORT}` + "/user/getData").then(res => {
          console.log(res.data.user)
          store.commit('SET_USER', res.data.user)
        })
    })



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

    return { states, deleteCompany, viewProgram, viewContact, user, store }
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


