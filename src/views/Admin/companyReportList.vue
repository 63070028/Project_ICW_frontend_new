<template>
  <preLoadingVue v-if="store.state.isLoadingData"></preLoadingVue>
  <div class="company p-3" v-if="!store.state.isLoadingData">
    <div class="columns">
      <div class="column is-3">
        <aside class="menu">
          <ul class="menu-list">
            <li>
              <router-link
                :class="{ 'is-active': activeTab === 'jobs' }"
                @click="setActiveTab('jobs')"
                to="/dashboard"
                >งานที่ได้รับแจ้ง</router-link
              >
            </li>
            <li>
              <router-link
                :class="{ 'is-active': activeTab === 'companys' }"
                @click="setActiveTab('companys')"
                to="/reportCommpanyList"
                >บริษัททั้งหมด</router-link
              >
            </li>
          </ul>
        </aside>
      </div>
      <div class="column is-9">
        <div class="card" style="min-height: 100vh">
          <div class="card-content">
            <div class="content">
              <div
                v-show="activeTab === 'companys'"
              >
                <h1 class="title">บริษัททั้งหมด</h1>

                <div
                  class="company-card"
                  v-for="(d, index) in companys"
                  :key="index"
                >
                  <div class="columns">
                    <div class="column is-11" @click="viewCompany(d.id)">
                      <p class="is-size-4 has-text-weight-bold">
                        {{ index + 1 + "." }} {{ d.name }}
                      </p>
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
import "bulma/css/bulma.css";
import { defineComponent, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import Company from "@/models/Company";
import axios from "axios";
import { PORT } from "@/port";
import { def_company } from "@/plugins/defaultValue";
import User from "@/models/User";
import { useStore } from "vuex";
import getUserData from "@/plugins/getUser";
import preLoadingVue from "@/components/pre-loading.vue";

export default defineComponent({
  components:{
    preLoadingVue
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const user = reactive<User>(store.state.user);
    //def
    const company = reactive<Company>(def_company);

    const companys = reactive<Company[]>([]);

    onMounted(async () => {
      store.commit("LOADING_DATA", true);

      await getUserData();

      await axios
        .get(`${PORT}` + "/admin/getCompany")
        .then((response) => {
          console.log(response.data.items);
          const get_company: Company[] = response.data.items;
          const company_state_on = get_company.filter(company => company.state === "on")
          company_state_on.forEach((company) => {
            companys.push(company);
          });
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });

        store.commit("LOADING_DATA", false);
    });

    const viewCompany = (id: string) => {
      router.push("/reportCompanyDetail/" + id);
    };

    return {
      router,
      route,
      company,
      companys,
      viewCompany,
      activeTab: "companys",
      store,
      user,
    };
  },
  methods: {
    setActiveTab(tab: string) {
      this.activeTab = tab;
    },
  },
});
</script>

<style scoped>
.company-card {
  border: 0.5px solid black;
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  background-color: #ffffff;
}
</style>