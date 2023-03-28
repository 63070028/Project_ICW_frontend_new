import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/views/HomePage.vue';
import CompanyPage from '@/views/Applicant/CompanyPage.vue';
import ProgramPage from '@/views/Applicant/ProgramPage.vue';
import ContactPage from '@/views/Applicant/ContactPage.vue';
import ApplicantProfilePage from '@/views/Applicant/ApplicantProfilePage.vue';
import JobPage from '@/views/Applicant/JobPage.vue';

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
    path: '/company',
    component: () => import(/* webpackChunkName: "about" */ '@/views/CompanyProfile.vue')
  },
  {
    path: '/companyJob',
    component: () => import(/* webpackChunkName: "about" */ '@/views/CompanyJob.vue')
  },
  {
    path: '/companyProgram',
    component: () => import(/* webpackChunkName: "about" */ '@/views/CompanyProgram.vue')
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
    path: '/Applicant',
    name: 'Applicant',
    component: () => import(/* webpackChunkName: "about" */ '../views/Company/ApplicantDetail.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
