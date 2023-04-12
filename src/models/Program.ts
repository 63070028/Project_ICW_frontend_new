export default interface Program {
    id: string,
    company_id:string,
    image: string,
    name: string,
    description: string, // เพิ่มคุณสมบัติ description
    course: string,
    jobs_title:string[],
    qualifications:string[],
    privileges:string[],
    state:string
  }
  