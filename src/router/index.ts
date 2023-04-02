import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/views/HomePage.vue';
import CompanyPage from '@/views/Applicant/CompanyPage.vue';
import ProgramPage from '@/views/Applicant/ProgramPage.vue';
import ContactPage from '@/views/Applicant/ContactPage.vue';
import ApplicantProfilePage from '@/views/Applicant/ApplicantProfilePage.vue';
import JobPage from '@/views/Applicant/JobPage.vue';
import CompanyProfileEdit from '@/views/Company/CompanyProfileEdit.vue';
import CompanyEditProgramPage from '@/views/Company/CompanyEditProgramPage.vue';
import Applicant from '@/views/Company/ApplicantDetail.vue';
import MyJobsPage from '@/views/Applicant/MyJobsPage.vue';
import CompanyAddProgram from '@/views/Company/companyAddProgram.vue';
import CompanyAddJob from '@/views/Company/CompanyAddJob.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/ex',
    component: () => import(/* webpackChunkName: "about" */ '@/views/ExamplePage.vue')
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
    path: '/companyProfile/:id',
    component: () => import(/* webpackChunkName: "about" */ '../views/Company/CompanyProfilePage.vue')
  },
  {
    path: '/companyJob',
    component: () => import(/* webpackChunkName: "about" */ '../views/Company/CompanyJobPage.vue')
  },
  {
    path: '/companyProgram',
    component: () => import(/* webpackChunkName: "about" */'../views/Company/CompanyProgramPage.vue')
  },
  
  { path: '/companyProfile/edit/:id',
    component:CompanyProfileEdit
  },
  {
    path: '/companyEditJob/:id',
    component: () => import(/* webpackChunkName: "about" */ '../views/Company/CompanyEditJob.vue')
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
  }
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
