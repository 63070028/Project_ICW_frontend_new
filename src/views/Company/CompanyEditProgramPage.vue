<template>
    <div class="company p-3">
      <div class="columns">
        <div class="column is-3" style="background-color: #f8f8f8;">
          <aside class="menu">
            <p class="menu-label">Navigation</p>
            <ul class="menu-list">
              <li><router-link :class="{ 'is-active': activeTab === 'info' }" @click="setActiveTab('info')" to="/companyProfile/1">ข้อมูลบริษัท</router-link></li>
              <li><router-link :class="{ 'is-active': activeTab === 'jobs' }" @click="setActiveTab('jobs')" to="/companyJob">งานที่ประกาศ</router-link></li>
              <li><router-link :class="{ 'is-active': activeTab === 'programs' }" @click="setActiveTab('programs')" to="/companyProgram" >โครงการพิเศษ</router-link ></li>
            </ul>
          </aside>
        </div>
        <div class="column is-9" style="background-color: #f1f1f1;">
            <div class="card" style="min-height: 100vh;">
                <div class="card-content">
                    <div class="content">
                        <div v-show="activeTab === 'programs'" style="background-color: #f6f6f6;">
                            <h1 class="title">แก้ไขโครงการพิเศษ</h1>

                            <div class="field">
                            <label class="label">ชื่อโครงการ</label>
                            <div class="control">
                                <input
                                class="input"
                                type="text"
                                placeholder="ชื่อโครงการ"
                                v-model="program.name"
                                />
                            </div>
                            </div>

                            <div class="field">
                            <label class="label">ระยะเวลา</label>
                            <div class="control">
                                <input
                                class="input"
                                type="text"
                                placeholder="ระยะเวลา"
                                v-model="program.duration"
                                />
                            </div>
                            </div>

                            <div class="field">
                            <label class="label">หมวดหมู่</label>
                            <div class="control">
                                <input
                                class="input"
                                type="text"
                                placeholder="หมวดหมู่"
                                v-model="program.category"
                                />
                            </div>
                            </div>

                            <div class="field">
                            <label class="label">สถานที่จัดโครงการ</label>
                            <div>
                                <div class="control">
                            <input
                            class="input"
                            type="text"
                            placeholder="สถานที่จัดโครงการ"
                            v-model="program.location"
                            />
                        </div>
                        </div>

                        <div class="field">
                        <label class="label">รายละเอียด</label>
                        <div class="control">
                            <textarea
                            class="textarea"
                            placeholder="รายละเอียดของโครงการพิเศษ"
                            v-model="program.description"
                            ></textarea>
                        </div>
                        </div>

                        <div class="field">
                        <div class="control">
                            <button class="button is-primary" @click="updateProgram">
                            บันทึกการแก้ไข
                            </button>
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
import Program from '@/models/Program';

export default defineComponent({
  name: 'CompanyEditProgramPage',

  setup() {
    const router = useRouter();
    const route = useRoute();

    const program = reactive<Program>({
      id: Number(route.params.id),
      name: '',
      duration: '',
      category: '',
      location: '',
      description: '',
    });

    onMounted(() => {
      console.log('get api program id: ' + route.params.id);

      const get_program = {
        id: 1,
        name: 'โครงการพิเศษ 1',
        duration: '1 เดือน',
        category: 'การพัฒนาซอฟต์แวร์',
        location: 'กรุงเทพมหานคร',
        description: 'รายละเอียดของโครงการพิเศษ 1',
      };
      Object.assign(program, get_program);
    });

    const updateProgram = () => {
      console.log('update api program id: ' + route.params.id);
      console.log('updated program:', program);
      router.push('/companyProgram');
    };

    return {
      router,
      route,
      program,
      updateProgram,
      activeTab: 'programs',
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
.program-card {
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  background-color: #ffffff;
}
</style>