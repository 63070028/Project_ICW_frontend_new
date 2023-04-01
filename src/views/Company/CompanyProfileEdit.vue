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
              <div class="container">
                <h1 class="title">แก้ไขข้อมูลบริษัท</h1>
                <div class="box">
                  <div class="field">
                    <label class="label">ชื่อบริษัท</label>
                    <div class="control">
                      <input class="input" type="text" v-model="company.name" /></div>
                  </div>
                  <div class="field">
                    <label class="label">คำอธิบาย</label>
                    <div class="control">
                      <textarea class="textarea" v-model="company.description"></textarea>
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">รูปโปรไฟล์</label>
                    <div class="control">
                      <input class="input" type="text" v-model="company.profile_image" />
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">รูปภาพพื้นหลัง</label>
                    <div class="control">
                      <input class="input" type="text" v-model="company.background_image" />
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">วิดีโอ</label>
                    <div class="control">
                      <input class="input" type="text" v-model="company.vdo" />
                    </div>
                  </div>
                  <div class="field is-grouped">
                    <div class="control">
                      <button class="button is-link" @click="saveProfile">บันทึก</button>
                    </div>
                    <div class="control">
                      <button class="button is-link is-light" @click="cancelEdit">ยกเลิก</button>
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
import { defineComponent, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Company from '@/models/Company';
export default defineComponent({
  name: 'CompanyProfileEdit',

  setup() {
    const router = useRouter();
    const route = useRoute();
    const company = reactive<Company>({
      id: Number(route.params.id),
      name: 'None',
      description: 'None',
      profile_image: '',
      background_image: '',
      vdo: '',
    });
    onMounted(() => {
      const get_company:Company = {
        id: 1,
        name:
          'ไม่ทำงาน จำกัด หมาชน',
        description:
          'THiNKNET คือ บริษัท IT ที่สร้างสรรค์ผลิตภัณฑ์และบริการที่มุ่งพัฒนาคุณภาพชีวิตของคนไทยให้ดีขึ้น ก่อตั้งขึ้นในปี 2000 ผลงานโดดเด่นคือ JobThai แพลตฟอร์มหาคน หางาน สมัครงานอันดับ 1 ของประเทศ ที่ช่วยให้คนไทยมีงานทำมานานมากกว่า 20 ปี นอกจากนี้แล้ว THiNKNET ยังพัฒนาสินค้าและบริการอื่น ๆ ออกมาอยู่เสมอ เช่น Mapping & GIS Solutions, THiNKNET Design Studio',
        profile_image:
          'https://cdn.discordapp.com/attachments/905751963017285634/1089481386349580359/profile-icon-design-free-vector.png',
        background_image:
          'https://www.w3schools.com/w3images/workbench.jpg',
        vdo:
          '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
      };
      Object.assign(company, get_company);
    });

    const saveProfile = () => {

      router.push(`/companyProfile/${company.id}`);
    };

    const cancelEdit = () => {
      router.push(`/companyProfile/${company.id}`);
    };
    return {
      company,
      router,
      saveProfile,
      cancelEdit,
      activeTab: 'info',
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
.background_image {
  width: 100%;
  height: 300px;
}

.profile_image {
  width: 150px;
  height: 150px;
  border: 2px solid gray;
  border-radius: 25px;
}

.vdo {
  display: flex;
  flex-direction: column;
}

.job_content:hover {
  background-color: hsl(0, 0%, 96%);
}
</style>

