<template>
  <div class="container">
    <h1 class="title">แก้ไขข้อมูลบริษัท</h1>
    <div class="box">
      <div class="field">
        <label class="label">ชื่อบริษัท</label>
        <div class="control">
          <input class="input" type="text" v-model="company.name" />
        </div>
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
      // Retrieve the company data from the API or a store
      // Update the company object with the retrieved data
    });

    const saveProfile = () => {
      // Save the updated company data to the API or a store
      // Navigate back to the company profile page
      router.push(`/companyProfile/${company.id}`);
    };

    const cancelEdit = () => {
      // Navigate back to the company profile page without saving changes
      router.push(`/companyProfile/${company.id}`);
    };

    return {
      company,
      saveProfile,
      cancelEdit,
    };
  },
});
</script>
