<template>
  <div class="company p-3">
    <div class="columns">
      <div class="column is-3" style="background-color: #f8f8f8; ">
        <aside class="menu">
          <p class="menu-label">Navigation</p>
          <ul class="menu-list">
            <li><router-link :class="{ 'is-active': activeTab === 'jobs' }" @click="setActiveTab('jobs')"
                to="/dashboard">งานที่ได้รับแจ้ง</router-link></li>
            <li><router-link :class="{ 'is-active': activeTab === 'companys' }" @click="setActiveTab('companys')"
                to="/reportCommpanyList">บริษัททั้งหมด</router-link></li>
          </ul>
        </aside>
      </div>
      <div class="column is-9" style="background-color: #f1f1f1; ">
        <div class="card" style="min-height: 100vh;">
          <div class="card-content">
            <div class="content">
              <div v-show="activeTab === 'companys'" style="background-color: #f6f6f6;">
                <h1 class="title">บริษัททั้งหมด</h1>

                <div class="company-card" v-for="d, index in companys" :key="index">
                  <div class="columns">
                    <div class="column is-11" @click="viewCompany(d.id)">
                      <p class="is-size-4 has-text-weight-bold">{{ index + 1 + "." }} {{ d.name }}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import 'bulma/css/bulma.css';
import { defineComponent, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Company from '@/models/Company';
import Swal from "sweetalert2";
import axios from "axios";
import { PORT } from "@/port";

export default defineComponent({
  name: 'App',

  setup() {
    const router = useRouter();
    const route = useRoute();

    //def
    const company = reactive<Company>({
      id: "",
      name: "",
      description: "",
      profile_image: "",
      background_image: "",
      video_iframe: "",
      state: ""
    });

    const companys = reactive<Company[]>([])


    onMounted(() => {
      axios
        .get(`${PORT}` + "/admin/getCompany")
        .then((response) => {
          console.log(response.data.items);
          const get_company: Company[] = response.data.items;
          console.log(get_company);
          get_company.forEach((company) => {
            companys.push(company);
          });
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });

    });

    const viewCompany = (id: string) => {
      router.push("/reportCompanyDetail/" + id)
    }

    return {
      router,
      route,
      company,
      companys,
      viewCompany,
      activeTab: 'companys',
    }
  },
  methods: {
    setActiveTab(tab: string) {
      this.activeTab = tab;
    },

  }
});

</script>

<style scoped>
.company-card {
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  background-color: #ffffff;
}
</style>