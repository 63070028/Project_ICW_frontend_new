import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/views/HomePage.vue';
import CompanyPage from '@/views/Applicant/CompanyPage.vue';
import ProgramPage from '@/views/Applicant/ProgramPage.vue';
import ContactPage from '@/views/Applicant/ContactPage.vue';
import ApplicantProfilePage from '@/views/Applicant/ApplicantProfilePage.vue';
import JobPage from '@/views/Applicant/JobPage.vue';
import CompanyProfileEdit from '@/views/Company/CompanyEditPage/CompanyProfileEdit.vue';
import CompanyEditProgramPage from '@/views/Company/CompanyEditPage/CompanyEditProgramPage.vue';
import Applicant from '@/views/Company/ApplicantDetail.vue';
import MyJobsPage from '@/views/Applicant/MyJobsPage.vue';
import CompanyAddProgram from '@/views/Company/CompanyEditPage/CompanyAddProgram.vue';
import CompanyAddJob from '@/views/Company/CompanyEditPage/CompanyAddJob.vue';
import AdminSignIn from '@/views/Admin/AdminSignIn.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/signup',
    component: () => import(/* webpackChunkName: "about" */ '@/views/SignUp.vue')
  },
  {
    path: '/signin',
    component: () => import(/* webpackChunkName: "about" */ '@/views/SignIn.vue')
  },
  {
    path: '/companyProfile',
    component: () => import(/* webpackChunkName: "about" */ '../views/Company/CompanyProfilePage.vue')
  },
  {
    path: '/companyJob',
    component: () => import(/* webpackChunkName: "about" */ '../views/Company/CompanyJobPage.vue')
  },
  {
    path: '/companyProgram',
    component: () => import('../views/Company/CompanyProgramPage.vue')
  },
  
  { path: '/companyProfile/edit',
    component:CompanyProfileEdit
  },
  {
    path: '/companyEditJob/:id',
    component: () => import('../views/Company/CompanyEditPage/CompanyEditJob.vue')
  },  
  {
    path: '/companyEditProgram/:id',
    name: 'CompanyEditProgram',
    component: CompanyEditProgramPage,
  },
  {
    path: '/companyAddProgram',
    name: 'CompanyAddProgram',
    component: CompanyAddProgram, // กำหนด component ให้กับ route
  },
  {
    path: '/companyAddJob',
    name: 'CompanyAddJob',
    component: CompanyAddJob, // กำหนด component ให้กับ route
  },
  {
    path: '/programs/:id',
    component:ProgramPage
  },
  {
    path: '/companies/:id',
    component:CompanyPage
  },
  {
    path: '/jobs/:id',
    component:JobPage,
  },
  {
    path: '/contact',
    component:ContactPage
  },
  {
    path: '/applicantProfile',
    component:ApplicantProfilePage
  },
  {
    path: '/ListApplicant',
    name: 'List',
    component: () => import(/* webpackChunkName: "about" */ '../views/Company/ListApplicant.vue')
  },
  {
    path: '/Applicant/:id',
    component:Applicant
  },
  {
    path: '/MyJobs',
    component:MyJobsPage
  },
  {
    path: '/dashboard',
    name: 'admin_dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin/adminReportList.vue')
  },
  {
    path: '/reportCommpanyList',
    name: 'repor',
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin/companyReportList.vue')
  },
  {
    path: '/reportCompanyDetail/:id',
    name: 'adminCompanyDetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin/companyReportDetail.vue')
  },
  {
    path: '/adminSignIn',
    component: AdminSignIn
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
