
<template>
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
  <div class="w3-light-grey">
    <div class="w3-content w3-margin-top" style="max-width: 1400px">
      <div class="w3-row-padding">
        <div class="w3-third">
          <div class="w3-white w3-text-grey w3-card-4">
            <div class="w3-display-container">
              <img
                src="https://e00-marca.uecdn.es/assets/multimedia/imagenes/2022/12/28/16721837440133.jpg"
                style="width: 100%"
                alt="Avatar"
              />
            </div>
            <div class="w3-container">
              <p>
                <i
                  class="fa fa-briefcase fa-fw w3-margin-right w3-large w3-text-teal"
                ></i
                >ชื่อ: {{ applicant.fullName }}
              </p>
              <p>
                <i
                  class="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal"
                ></i
                >อีเมล: {{ applicant.email }}
              </p>
              <p>
                <i
                  class="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"
                ></i
                >ตำแหน่งที่สมัคร: {{ applicant.position }}
              </p>
              <p>
                <i
                  class="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal"
                ></i
                >วันเกิด: {{ applicant.birthDate }}
              </p>
              <p>
                <i
                  class="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal"
                ></i
                >เพศ: {{ applicant.gender }}
              </p>
              <p>
                <i
                  class="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal"
                ></i
                >เบอร์ติดต่อ: {{ applicant.phone }}
              </p>
              <div>
                <button @click="acceptApplicant()" class="button mb-3 mt-3 is-success w3-margin-right">
                  Accept
                </button>
                
                <button
                  @click="declineApplicant()"
                  class="button mb-3 mt-3 is-danger w3-margin-right"
                >
                  Decline
                </button>
              </div>
              <hr />
            </div>
          </div>
          <br />
        </div>

        <div class="w3-twothird">
          <div class="w3-container w3-card w3-white w3-margin-bottom">
            <div class="columns mt-6">
              <div class="column is-2"></div>
              <div class="tabs is-boxed column is-8">
                <ul>
                  <li
                    :class="[select_option === 'resume' ? 'is-active' : '']"
                    @click="select_option = 'resume'"
                  >
                    <a>
                      <span>Resume</span>
                    </a>
                  </li>
                  <li
                    :class="[select_option === 'transcript' ? 'is-active' : '']"
                    @click="select_option = 'transcript'"
                  >
                    <a>
                      <span>Transcript</span>
                    </a>
                  </li>
                  <li
                    :class="[select_option === 'portfolio' ? 'is-active' : '']"
                    @click="select_option = 'portfolio'"
                  >
                    <a>
                      <span>Portfolio</span>
                    </a>
                  </li>
                </ul>

                <uploadPdfVue
                  :maxSize="100"
                  :upload_category="select_option"
                  v-if="select_option === 'resume'"
                ></uploadPdfVue>
                <uploadPdfVue
                  :maxSize="100"
                  :upload_category="select_option"
                  v-if="select_option === 'transcript'"
                ></uploadPdfVue>
                <uploadPdfVue
                  :maxSize="100"
                  :upload_category="select_option"
                  v-if="select_option === 'portfolio'"
                ></uploadPdfVue>
              </div>

              <div class="column is-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div :class="['modal', confirmDelete ? 'is-active' : '']">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">ต้องการปฏิเสธผู้สมัครรายนี้</p>
                <button class="delete" aria-label="close" @click="confirmDelete = !confirmDelete"></button>
            </header>
            <footer class="modal-card-foot">
                <button class="button is-success" >Submit</button>
                <button class="button" @click="confirmDelete = !confirmDelete">Cancel</button>
            </footer>
        </div>
    </div>

</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import uploadPdfVue from "@/components/upload-pdf.vue";
// import Applicant from "@/models/Applicant";
import "primeicons/primeicons.css";
import Swal from "sweetalert2";
import { useVuelidate } from "@vuelidate/core";
export default defineComponent({
  components: {
    uploadPdfVue,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const v$ = useVuelidate();

    const confirmDelete = ref<boolean>(false);
    //ยังไม่กำหนด any ไปก่อน
    const applicant = reactive<any>({
      id: Number(route.params.id),
      fullName: "None",
      position: "None",
      email: "None",
      birthDate: "None",
      gender: "None",
      phone: "None",
      type: "None",
    });

    const declineApplicant = () => {
            //ปฏิ
            Swal.fire({
                title: 'ปฏิเสธผู้สมัครหมายเลข ' + route.params.id,
                text: "คุณแน่ใจแล้วใช่ไหมที่จะปฏิเสธผู้สมัครรายนี้",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'hsl(141, 50%, 48%)',
                cancelButtonColor: 'hsl(348, 100%, 61%)',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'ทำการลบผู้สมัครเรียบร้อย',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    router.push("/ListApplicant")
                }
            })
        };
    const acceptApplicant = () => {
            //ปฏิ
            Swal.fire({
                title: 'รับผู้สมัครหมายเลข ' + route.params.id,
                text: "",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: 'hsl(141, 50%, 48%)',
                cancelButtonColor: 'hsl(348, 100%, 61%)',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'ทำการรับผู้สมัครเรียบร้อย',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        };
    onMounted(() => {
      console.log("get api applicant id: " + route.params.id);

      //set applicant
      const get_applicant = {
        id: 1,
        fullName: "AAA AAA",
        position: "XXXX",
        email: "XXX@gmail.com",
        birthDate: "xx-xx-xxxx",
        gender: "Male",
        phone: "xxx-xxxxxxx",
        type: "Program",
      };
      Object.assign(applicant, get_applicant);
    });

    let select_option = ref<string>("user_profile");


    return {
      v$,
      confirmDelete,
      router,
      route,
      applicant,
      select_option,
      declineApplicant,
      acceptApplicant
    };
  },
});
</script>


<style scoped>
.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

/* Add some padding inside the card container */
.container {
  padding: 2px 16px;
}
</style>