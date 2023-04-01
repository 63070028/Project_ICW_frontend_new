
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
                >{{ applicant.fullName }}
              </p>
              <p>
                <i
                  class="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal"
                ></i
                >{{ applicant.email }}
              </p>
              <p>
                <i
                  class="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"
                ></i
                >{{ applicant.position }}
              </p>
              <p>
                <i
                  class="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal"
                ></i
                >{{ applicant.fullName }}
              </p>
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
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import uploadPdfVue from "@/components/upload-pdf.vue";
import Applicant from "@/models/Applicant";

export default defineComponent({
  components: {
    uploadPdfVue,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const applicant = reactive<Applicant>({
      id: Number(route.params.id),
      fullName: "None",
      position: "None",
      email: "None",
      birthDate: "None",
      gender: "None",
      phone: "None",
      type: "None",
    });

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
      router,
      route,
      applicant,
      select_option,
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