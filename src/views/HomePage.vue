<template>
  <PreloaderVue v-if="store.state.isLoadingData"></PreloaderVue>
  <div class="container" v-if="!store.state.isLoadingData">
    <div class="columns ml-6 mt-5 pl-3 pr-3">

      <div class="column has-background-dark is-2 mr-6 has-text-white box" @click="viewContact()"
        style="cursor: pointer;">
        <p class="is-size-1 has-text-centered">Professor Contact</p>
      </div>

      <div class="column is-10 ml-3 mr-3 ">
        <Carousel :autoplay="1500" :wrapAround="true" style="width: 90%;">
          <!-- //Array state.progarms -->
          <Slide v-for="(program, index) in states.programs" :key="index">
            <img @click="viewProgram(program.id)" class="carousel__item"  :src="program.image" width="800">
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
import { defineComponent, onMounted, reactive } from 'vue'
import companyList from '../components/company-list.vue'
import Company from '@/models/Company'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { useRouter } from 'vue-router'
import Program from '@/models/Program'
import { useStore } from 'vuex'
import User from '@/models/User'
import PreloaderVue from '@/components/pre-loading.vue'
import getUserData from '@/plugins/getUser'
import axios from '@/plugins/axios'
import { PORT } from '@/port'


export default defineComponent({
  components: {
    companyList,
    Carousel,
    Slide,
    PreloaderVue,
    Pagination,
    Navigation,
  },

  setup() {

    const router = useRouter();

    const store = useStore();

    const user = reactive<User>(store.state.user)

    const states = reactive<{ companies: Company[], programs: Program[] }>({
      companies: [],
      programs: []
    });

    onMounted(async () => {
      store.commit('LOADING_DATA', true)

      await getUserData();

      await axios.get(`${PORT}`+"/company/getCompanyStateOn").then(res => {
        const companies:Company[] = res.data
        companies.forEach((company)=>states.companies.push(company))
      });

      await axios.get(`${PORT}`+"/company/getProgramStateOn").then(res =>{
        const progarms:Program[] = res.data
        progarms.forEach((progarm)=>states.programs.push(progarm));
      })

      store.commit('LOADING_DATA', false)
    })



    const deleteCompany = (index: number) => {
      console.log(index)
      states.companies.splice(index, 1);
    };

    const viewProgram = (id: string) => {
      router.push("/programs/"+id)
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


