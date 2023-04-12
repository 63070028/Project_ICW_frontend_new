<template>
  <div class="company p-3">
    <div class="columns" >
      <div class="column is-3" style="background-color: #f8f8f8; ">
        <aside class="menu">
          <p class="menu-label">Navigation</p>
          <ul class="menu-list">
            <li><router-link :class="{ 'is-active': activeTab === 'jobs' }" @click="setActiveTab('jobs')" to="/dashboard">งานที่ได้รับแจ้ง</router-link></li>
            <li><router-link :class="{ 'is-active': activeTab === 'companys' }" @click="setActiveTab('companys')" to="/reportCommpanyList">บริษัททั้งหมด</router-link></li>
          </ul>
        </aside>
      </div>
      <div class="column is-9" style="background-color: #f1f1f1; ">
        <div class="card" style="min-height: 100vh;">
          <div class="card-content" >
            <div class="content" >
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

export default defineComponent({
name: 'App',
  
    setup() {
        const router = useRouter();
        const route = useRoute();

        //def
        const company = reactive<Company>({
            id: Number(route.params.id),
            name: "None",
            description: "None",
            profile_image: "",
            background_image: "",
            vdo: ""
        });

        const companys = reactive<Company[]>([])
        const removeCompany = (index: number) => {
            Swal.fire({
                title: 'ปฏิเสธผู้สมัครหมายเลข ',
                text: "คุณแน่ใจแล้วใช่ไหมที่จะปฏิเสธผู้สมัครรายนี้",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'hsl(141, 50%, 48%)',
                cancelButtonColor: 'hsl(348, 100%, 61%)',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.isConfirmed) {
                    companys.splice(index-1, 1)
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'ทำการลบผู้สมัครเรียบร้อย',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        };

        onMounted(() => {

            let get_companys:Company[] = [
             { id: 1, name: "ไม่ทำงาน จำกัด หมาชน", description:"THiNKNET คือ บริษัท IT ที่สร้างสรรค์ผลิตภัณฑ์และบริการที่มุ่งพัฒนาคุณภาพชีวิตของคนไทยให้ดีขึ้น ก่อตั้งขึ้นในปี 2000 ผลงานโดดเด่นคือ CompanyThai แพลตฟอร์มหาคน หางาน สมัครงานอันดับ 1 ของประเทศ ที่ช่วยให้คนไทยมีงานทำมานานมากกว่า 20 ปี นอกจากนี้แล้ว THiNKNET ยังพัฒนาสินค้าและบริการอื่น ๆ ออกมาอยู่เสมอ เช่น Mapping & GIS Solutions, THiNKNET Design Studio", profile_image:"https://cdn.discordapp.com/attachments/905751963017285634/1089481386349580359/profile-icon-design-free-vector.png", background_image:"https://www.w3schools.com/w3images/workbench.jpg", vdo:'<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' },
             { id: 2, name: "ไม่ทำงาน จำกัด", description:"THiNKNET คือ บริษัท IT ที่สร้างสรรค์ผลิตภัณฑ์และบริการที่มุ่งพัฒนาคุณภาพชีวิตของคนไทยให้ดีขึ้น ก่อตั้งขึ้นในปี 2000 ผลงานโดดเด่นคือ CompanyThai แพลตฟอร์มหาคน หางาน สมัครงานอันดับ 1 ของประเทศ ที่ช่วยให้คนไทยมีงานทำมานานมากกว่า 20 ปี นอกจากนี้แล้ว THiNKNET ยังพัฒนาสินค้าและบริการอื่น ๆ ออกมาอยู่เสมอ เช่น Mapping & GIS Solutions, THiNKNET Design Studio", profile_image:"https://cdn.discordapp.com/attachments/905751963017285634/1089481386349580359/profile-icon-design-free-vector.png", background_image:"https://www.w3schools.com/w3images/workbench.jpg", vdo:'<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' },
             { id: 3, name: "ไม่ทำงาน", description:"THiNKNET คือ บริษัท IT ที่สร้างสรรค์ผลิตภัณฑ์และบริการที่มุ่งพัฒนาคุณภาพชีวิตของคนไทยให้ดีขึ้น ก่อตั้งขึ้นในปี 2000 ผลงานโดดเด่นคือ CompanyThai แพลตฟอร์มหาคน หางาน สมัครงานอันดับ 1 ของประเทศ ที่ช่วยให้คนไทยมีงานทำมานานมากกว่า 20 ปี นอกจากนี้แล้ว THiNKNET ยังพัฒนาสินค้าและบริการอื่น ๆ ออกมาอยู่เสมอ เช่น Mapping & GIS Solutions, THiNKNET Design Studio", profile_image:"https://cdn.discordapp.com/attachments/905751963017285634/1089481386349580359/profile-icon-design-free-vector.png", background_image:"https://www.w3schools.com/w3images/workbench.jpg", vdo:'<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' },
            ]

            get_companys.forEach(d => {
                companys.push(d)
            });
        });

        const viewCompany = (id: number) => {
            router.push("/reportCompanyDetail/" + id)
        }

        return {
            router,
            route,
            company,
            companys,
            viewCompany,
            removeCompany,
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