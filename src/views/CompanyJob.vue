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
                <div v-show="activeTab === 'jobs'" style="background-color: #f6f6f6; min-height: 100vh;">
                    <h1 class="title">งานที่ประกาศ</h1>
                    <button class="button is-primary" @click="openAddJobModal">เพิ่มงานใหม่</button>
                  <div class="columns is-multiline">
                    <div class="column is-full" v-for="job in jobs" :key="job.id">
                      <div class="box">
                          <h2 class="subtitle">{{ job.title }}</h2>
                          <p>ตำแหน่ง: {{ job.position }}</p>
                          <p>วันที่โพส: {{ job.postedDate }}</p>
                          <p>คุณสมบัติ: {{ job.qualifications }}</p>
                          <p>ความรับผิดชอบ: {{ job.responsibilities }}</p>
                          <p>เงินเดือน: {{ job.salary }}</p>
                          <p>สถานที่ทำงาน: {{ job.location }}</p>
                          <button class="button is-small is-info" @click="openEditJobModal(job.id)">แก้ไขรายละเอียด</button>
                        <span  :class="{ 'has-text-success': !job.closed, 'has-text-danger': job.closed }"> สถานะปัจจุบัน : {{ job.closed ? 'ปิดรับสมัคร' : 'เปิดรับสมัคร' }}</span>
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
  <div class="modal" :class="{ 'is-active': showModal }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ modalTitle }}</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">ชื่องาน</label>
          <div class="control">
            <input class="input" type="text" v-model="currentJob.title" placeholder="ชื่องาน">
          </div>
        </div>
        <div class="field">
          <label class="label">ตำแหน่ง</label>
          <div class="control">
            <input class="input" type="text" v-model="currentJob.position" placeholder="ตำแหน่ง">
          </div>
        </div>
        <div class="field">
          <label class="label">วันที่โพส</label>
          <div class="control">
            <input class="input" type="date" v-model="currentJob.postedDate" placeholder="วันที่โพส">
          </div>
        </div>
    <div class="field">
      <label class="label">คุณสมบัติ</label>
      <div class="control">
        <textarea class="textarea" v-model="currentJob.qualifications" placeholder="คุณสมบัติ"></textarea>
      </div>
    </div>
    <div class="field">
      <label class="label">ความรับผิดชอบ</label>
      <div class="control">
        <textarea class="textarea" v-model="currentJob.responsibilities" placeholder="ความรับผิดชอบ"></textarea>
      </div>
    </div>
    <div class="field">
      <label class="label">เงินเดือน</label>
      <div class="control">
        <input class="input" type="number" v-model="currentJob.salary" placeholder="เงินเดือน">
      </div>
    </div>
    <div class="field">
    <label class="label">ปิดรับสมัคร</label>
    <div class="control">
<label class="checkbox">
<input type="checkbox" v-model="currentJob.closed">
ปิดรับสมัคร
</label>
</div>
  </div>
  <div class="field">
    <button
      class="button is-small"
      :class="{ 'is-success': !currentJob.closed, 'is-danger': currentJob.closed }"
      @click="toggleJobStatus(currentJob.id)">
      {{ currentJob.closed ? 'ปิดรับสมัคร' : 'เปิดรับสมัคร' }}
    </button>
  </div>
</section>
  <footer class="modal-card-foot">
    <button class="button is-success" @click="saveChanges">บันทึก</button>
    <button class="button" @click="closeModal">ยกเลิก</button>
  </footer>
</div>
</div>
</template>
<style>
  /* ... */
</style>
<script>
import 'bulma/css/bulma.css';
export default {
name: 'App',
data() {
  return {
    activeTab: 'jobs',
    showModal: false,
    modalTitle: '',
    currentJob: {},
    jobs: [
      {
        id: 1,title: 'งานที่ 1',position: 'ตำแหน่ง 1',postedDate: '2023-03-15',qualifications: 'ปริญญาตรีขึ้นไปในสาขาที่เกี่ยวข้อง',responsibilities: 'รับผิดชอบงานในส่วนของการพัฒนาซอฟต์แวร์',salary: '30,000 - 40,000 บาท',location: 'กรุงเทพมหานคร', closed: false
      },
      { id: 2,title: 'งานที่ 2',position: 'ตำแหน่ง 2',postedDate: '2023-03-12',qualifications: 'ปริญญาตรีขึ้นไปในสาขาที่เกี่ยวข้อง',responsibilities: 'รับผิดชอบงานในส่วนของการวางแผนโครงการ',salary: '35,000 - 45,000 บาท',location: 'กรุงเทพมหานคร', closed: true
      },
      { id: 3,title: 'งานที่ 3',position: 'ตำแหน่ง 3',postedDate: '2023-03-10',qualifications: 'ปริญญาตรีขึ้นไปในสาขาที่เกี่ยวข้อง',responsibilities: 'รับผิดชอบงานในส่วนของการตลาดและการขาย',salary: '25,000 - 35,000 บาท',location: 'กรุงเทพมหานคร', closed: false
      },
    ]
  }
},
methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    openAddJobModal() {
      this.modalTitle = 'เพิ่มงานใหม่';
      this.currentJob = {}; // Reset the current job
      this.showModal = true;
    },
    openEditJobModal(jobId) {
      const job = this.jobs.find(j => j.id === jobId);
      if (job) {
      this.currentJob = { ...job };
      this.modalTitle = 'แก้ไขรายละเอียดงาน';
      this.showModal = true;
      }
    },
    closeModal() {
      this.showModal = false;
    },
    saveChanges() {
      const jobIndex = this.jobs.findIndex(j => j.id === this.currentJob.id);
      if (jobIndex > -1) {
        this.jobs.splice(jobIndex, 1, this.currentJob);
      }
      this.showModal = false;
    },
    toggleJobStatus(jobId) {
      const job = this.jobs.find(j => j.id === jobId);
      if (job) {
        job.closed = !job.closed;
      }
    },
  }
}
</script>