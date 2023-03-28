<template>
  <div class="container" style="min-height: 100vh;">
    <div class="columns" style="min-height: 100vh;">
      <div class="column is-3" style="background-color: #f8f8f8; min-height: 100vh;">
        <aside class="menu">
          <p class="menu-label">Navigation</p>
          <ul class="menu-list">
            <li><router-link :class="{ 'is-active': activeTab === 'info' }" @click="setActiveTab('info')" to="/company">ข้อมูลบริษัท</router-link></li>
            <li><router-link :class="{ 'is-active': activeTab === 'jobs' }" @click="setActiveTab('jobs')" to="/companyJob">งานที่ประกาศ</router-link></li>
            <li><router-link :class="{ 'is-active': activeTab === 'programs' }" @click="setActiveTab('programs')" to="/companyProgram">โครงการพิเศษ</router-link></li>
          </ul>
        </aside>
      </div>
      <div class="column is-9" style="background-color: #f1f1f1; min-height: 100vh;">
        <div class="card" style="min-height: 100vh;">
          <div class="card-content" style="min-height: 100vh;">
            <div class="content" style="min-height: 100vh;">
              <!-- About Us tab content -->
              <div v-show="activeTab === 'info'" style="background-color: #fafafa; min-height: 100vh;">
                <div class="card-content " style="min-height: 100vh;">
                  <figure class="image is-2x9 company-cover">
                    <img :src="companyCover" alt="Company Cover Image">
                  </figure>
                  <div class="media company-profile">
                    <div class="media-left">
                      <figure class="image is-96x96">
                        <img :src="companyLogo" alt="Company Logo" class="company-logo">
                      </figure>
                    </div>
                    <div class="media-content">
                      <p class="title is-4">{{ companyName }}</p>
                      <p class="subtitle is-6">@{{ companyUsername }}</p>
                      <p>{{ companyDescription }}</p>
                    </div>
                  </div>
        
                  <div class="content">
                    <button class="button" @click="editProfile">แก้ไขข้อมูลบริษัท</button>
                    <div class="modal" :class="{ 'is-active': editingProfile }">
                      <div class="modal-background" @click="cancelEdit"></div>
                      <div class="modal-card">
                        <header class="modal-card-head">
                          <p class="modal-card-title">แก้ไขข้อมูลบริษัท</p>
                          <button class="delete" aria-label="close" @click="cancelEdit"></button>
                        </header>
                        <section class="modal-card-body">
                          <form>
                            <div class="field">
                                <label class="label">โลโก้บริษัท</label>
                                <div class="control">
                                  <input class="input" type="text" v-model="companyLogo" placeholder="URL ของโลโก้บริษัท">
                                </div>
                              </div>
                              <div class="field">
                                <label class="label">รูปหน้าปก</label>
                                <div class="control">
                                  <input class="input" type="text" v-model="companyCover" placeholder="URL ของรูปหน้าปก">
                                </div>
                              </div>
                            <div class="field">
                              <label class="label">ชื่อบริษัท</label>
                              <div class="control">
                                <input class="input" type="text" v-model="companyName">
                              </div>
                            </div>
                            <div class="field">
                              <label class="label">รายละเอียดบริษัท</label>
                              <div class="control">
                                <textarea class="textarea" v-model="companyDescription"></textarea>
                          </div>
                        </div>
                      </form>
                    </section>
                    <footer class="modal-card-foot">
                      <button class="button is-success" @click="saveProfile">บันทึก</button>
                      <button class="button" @click="cancelEdit">ยกเลิก</button>
                    </footer>
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
</div>
</template>
<style>


.company-logo {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  margin-top: 1rem;
}

.company-cover {
  width: 100%;
  max-height: 5%;

}
</style>
<script>
export default {
  name: 'App',
  data() {
    return {
      activeTab: 'info',
      editingProfile: false,
      companyName: 'Acme Corporation',
      companyUsername: 'acmecorp',
      companyDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.',
      companyLogo: 'https://bulma.io/images/placeholders/96x96.png',
      companyCover: 'https://bulma.io/images/placeholders/1280x960.png'
    }
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    editProfile() {
      this.editingProfile = true;
    },
    cancelEdit() {
      this.editingProfile = false;
    },
    saveProfile() {
      this.editingProfile = false;
    }
  }
}
</script>