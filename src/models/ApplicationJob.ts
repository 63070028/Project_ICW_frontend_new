export default interface ApplicationJob {
  id: string,
  job_id: string,
  applicant_id: string,
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
  state: string,
  type?: string
}
