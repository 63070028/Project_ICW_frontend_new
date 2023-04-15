<template>
  <div class="company p-3">
    <div class="columns">
      <div class="column is-3" style="background-color: #f8f8f8"></div>
      <div class="column is-9" style="background-color: #f1f1f1">
        <div class="card" style="min-height: 100vh">
          <div class="card-content">
            <div class="content">
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
                    <div class="file">
                      <label class="file-label">
                        <input class="file-input" type="file" name="profile_image" @change="previewProfileImage" />
                        <span class="file-cta is-small">
                          <span class="file-label"> Choose a file.. </span>
                        </span>
                      </label>
                    </div>

                    <div class="control">
                      <img v-if="profileImagePreview" :src="profileImagePreview" class="image-preview profile_image" />
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">รูปภาพพื้นหลัง</label>
                    <div class="control">
                      <div class="file">
                        <label class="file-label">
                          <input class="file-input" type="file" name="background_image"
                            @change="previewBackgroundImage" />
                          <span class="file-cta is-small">
                            <span class="file-label"> Choose a file.. </span>
                          </span>
                        </label>
                      </div>
                      <br />
                      <img v-if="backgroundImagePreview" :src="backgroundImagePreview" class="background_image" />
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">วิดีโอ</label>
                    <div class="columns">
                      <div class="column">
                        <img src="https://sv1.picz.in.th/images/2023/04/02/m1nC4y.png" alt="m1nC4y.png" border="0" />
                      </div>
                      <div class="column">
                        <img src="https://sv1.picz.in.th/images/2023/04/02/m1nvp8.png" alt="m1nvp8.png" border="0" />
                      </div>
                      <div class="column">
                        <img src="https://sv1.picz.in.th/images/2023/04/02/m1nJNR.png" alt="m1nJNR.png" border="0" />
                      </div>
                    </div>
                    <div class="control">
                      <input class="input" type="text" v-model="company.video_iframe" />
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">สถานะ</label>
                    <div class="control">
                      <div class="select">
                        <select v-model="company.state">
                          <option value="on">เปิดการแสดงข้อมูลบริษัท</option>
                          <option value="off">ปิดการแสดงข้อมูลบริษัท</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="field is-grouped">
                    <div class="control">
                      <button class="button is-link" @click="saveProfile">
                        บันทึก
                      </button>
                    </div>
                    <div class="control">
                      <button class="button is-link is-light" @click="cancelEdit">
                        ยกเลิก
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
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Company from "@/models/Company";
import Swal from "sweetalert2";
import { PORT } from "@/port";
import axios from "axios";
import { useStore } from "vuex";
import User from "@/models/User";

export default defineComponent({
  emits: ["updateProfileEdit", "saveEdit"],
  
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    profile_image: {
      type: String,
      required: true,
    },
    background_image: {
      type: String,
      required: true,
    },
    video_iframe: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    
    const router = useRouter();

    const company = reactive<Company>({
      id: props.id ,
      name: props.name,
      description: props.description,
      profile_image: props.profile_image,
      background_image: props.background_image,
      video_iframe: props.video_iframe,
      state: props.state,
    });

    const profileImageInput = ref<HTMLInputElement | null>(null);
    const backgroundImageInput = ref<HTMLInputElement | null>(null);
    const profileImagePreview = ref(company.profile_image);
    const backgroundImagePreview = ref(company.background_image);

    const saveProfile = async () => {

      const result = await Swal.fire({
        title: "ยืนยันการบันทึก?",
        text: "คุณต้องการบันทึกข้อมูลการแก้ไขหรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      });
      let swalWaiting = Swal.fire({
        position: "center",
        title: "Uploading file...",
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      if (result.isConfirmed) {
        try {

          company.id = props.id;
          company.name = props.name;
          company.description = props.description;
          company.background_image = props.profile_image;
          company.background_image = props.background_image;
          company.video_iframe = props.video_iframe;
          company.state = "on"

          const formData = new FormData();
          formData.append("id", props.id);
          formData.append("name", company.name);
          formData.append("description", company.description);
          formData.append("video_iframe", company.video_iframe);
          formData.append("state", company.state); // ใส่ค่า state เป็น on ใน form data

          if (profileImageInput.value?.files?.[0]) {
            formData.append("profile_image", profileImageInput.value.files[0]);
          }
          if (backgroundImageInput.value?.files?.[0]) {
            formData.append(
              "background_image",
              backgroundImageInput.value.files[0]
            );
          }

          const response = await axios.post(
            `${PORT}` + "/company/edit",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          console.log(response.data);
          company.profile_image = response.data.profile_image
          company.background_image = response.data.background_image
          Swal.fire({
            title: "Success",
            text: "Company profile updated successfully",
            icon: "success",
          });

          emit('saveEdit', company)
          emit('updateProfileEdit', false)
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "Failed to update company profile",
            icon: "error",
          });
        }
      }
    };


    const cancelEdit = async () => {
      //
      emit("updateProfileEdit", false);
    };

    const previewProfileImage = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        profileImagePreview.value = URL.createObjectURL(file);
        profileImageInput.value = event.target as HTMLInputElement; // Update the profileImageInput ref with the input element
      }
    };

    const previewBackgroundImage = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        backgroundImagePreview.value = URL.createObjectURL(file);
        backgroundImageInput.value = event.target as HTMLInputElement; // Update the backgroundImageInput ref with the input element
      }
    };

    return {
      company,
      router,
      saveProfile,
      cancelEdit,
      activeTab: "info",
      profileImageInput,
      backgroundImageInput,
      profileImagePreview,
      backgroundImagePreview,
      previewProfileImage,
      previewBackgroundImage,
 
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

.video_iframe {
  display: flex;
  flex-direction: column;
}

.job_content:hover {
  background-color: hsl(0, 0%, 96%);
}

.image-preview {
  width: 150px;
  margin-top: 1rem;
}

.file-cta.is-small {
  font-size: 0.75rem;
}

.file-label {
  text-align: center;
}

.profile_image {
  width: 150px;
  height: 150px;
  border: 2px solid gray;
  border-radius: 25px;
}
</style>
