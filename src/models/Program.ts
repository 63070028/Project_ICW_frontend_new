export default interface Program {
    id: number,
    company_id:number,
    name: string,
    description: string, // เพิ่มคุณสมบัติ description
    course: string,
    job_title:string[],
    qualifications:string[],
    privileges:string[]
  }
  