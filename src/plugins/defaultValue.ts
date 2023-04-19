import Applicant from "@/models/Applicant";
import ApplicationJob from "@/models/ApplicationJob";
import ApplicationProgram from "@/models/ApplicationProgram";
import Company from "@/models/Company";
import Job from "@/models/Job";
import JobReport from "@/models/JobReport";
import Program from "@/models/Program";
import ApplicantSignUpModel from "@/models/formModels/ApplicantSignUpModel";
import ApplicationJobModel from "@/models/formModels/ApplicationJobModel";
import ApplicationProgramModel from "@/models/formModels/ApplicationProgramModel";
import CompanySignUpModel from "@/models/formModels/CompanySignUpModel";
import JobFavoriteModel from "@/models/formModels/JobFavoriteModel";
import JobReportModel from "@/models/formModels/JobReportModel";
import { reactive } from "vue";

const def_job = reactive<Job>({
  id: "",
  company_id: "",
  company_name: "",
  name: "",
  salary_per_day: 0,
  location: "",
  capacity: 0,
  detail: "",
  interview: "",
  qualifications: [],
  contact: {
    name: "",
    email: "",
    phone: "",
  },
  creation_date: "",
  state: "",
});

const def_applicant = reactive<Applicant>({
  id: "",
  firstName: "",
  lastName: "",
  email_profile: "",
  birthDate: "",
  gender: "",
  address: "",
  phone: "",
  resume: "",
  transcript: "",
  portfolio: "",
  state: "",
});

const def_applicationJob = reactive<ApplicationJob>({
  id: "",
  applicant_id: "",
  company_name: "",
  company_id: "",
  job_name: "",
  job_id: "",
  firstName: "",
  lastName: "",
  email_profile: "",
  birthDate: "",
  gender: "",
  address: "",
  phone: "",
  resume: "",
  transcript: "",
  portfolio: "",
  state: "",
});

const def_formApplicationJob = reactive<ApplicationJobModel>({
  applicant_id: "",
  company_name: "",
  company_id: "",
  job_name: "",
  job_id: "",
  firstName: "",
  lastName: "",
  email_profile: "",
  birthDate: "",
  gender: "",
  address: "",
  phone: "",
  resume: "",
  transcript: "",
  portfolio: "",
  state: "",
});

const def_applicationProgram = reactive<ApplicationProgram>({
  id: "",
  applicant_id: "",
  company_name: "",
  company_id: "",
  program_id: "",
  program_name: "",
  job_title: "",
  firstName: "",
  lastName: "",
  email_profile: "",
  birthDate: "",
  gender: "",
  address: "",
  phone: "",
  resume: "",
  transcript: "",
  portfolio: "",
  state: "",
});

const def_formReport = reactive<JobReportModel>({
  user_id: "",
  company_name: "",
  company_id: "",
  job_name: "",
  job_id: "",
  creation_date: "",
  message: "",
});

const def_formApplicantSignUp = reactive<ApplicantSignUpModel>({
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  email_profile: "",
  birthDate: "",
  gender: "",
  address: "",
  phone: "",
  resume: "",
  transcript: "",
  portfolio: "",
  state: "",
});

const def_formCompanySignUp = reactive<CompanySignUpModel>({
  email: "",
  password: "",
  name: "",
  description: "",
  profile_image: "",
  background_image: "",
  video_iframe: "",
  state: "",
});

const def_fromApplicationProgram = reactive<ApplicationProgramModel>({
  applicant_id: "",
  company_name: "",
  company_id: "",
  program_id: "",
  program_name: "",
  job_title: "",
  firstName: "",
  lastName: "",
  email_profile: "",
  birthDate: "",
  gender: "",
  address: "",
  phone: "",
  resume: "",
  transcript: "",
  portfolio: "",
  state: "",
});

const def_program = reactive<Program>({
  id: "",
  company_id: "",
  company_name: "",
  name: "",
  description: "", // เพิ่มคุณสมบัติ description
  course: "",
  jobs_title: [],
  qualifications: [],
  privileges: [],
  image: "",
  state: "",
});

const def_company = reactive<Company>({
  id: "",
  name: "",
  description: "",
  profile_image: "",
  background_image: "",
  video_iframe: "",
  state: "",
});

const def_JobReport = reactive<JobReport>({
  id: "",
  user_id: "",
  company_name: "",
  company_id: "",
  job_name: "",
  job_id: "",
  creation_date: "",
  message: "",
});

const def_JobFavorit = reactive<JobFavoriteModel>({
  applicant_id: "",
  job_id: "",
});

export {
  def_applicant,
  def_applicationProgram,
  def_applicationJob,
  def_company,
  def_job,
  def_JobReport,
  def_program,
  def_formApplicantSignUp,
  def_formCompanySignUp,
  def_formReport,
  def_formApplicationJob,
  def_fromApplicationProgram,
  def_JobFavorit
};
