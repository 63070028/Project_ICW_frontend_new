export default interface ApplicationJob {
  id: number | string,
  job_id: number | string,
  applicant_id: number | string,
  firstName: string,
  lastName: string,
  email: string,
  birthDate: string,
  gender: string,
  address: string,
  phone: string,
  resume: string,
  transcript: string,
  portfolio: string,
  status: string,
  type: string
}
