export enum ProgramStatus {
    Open = 'เปิดรับสมัคร',
    Closed = 'ปิดรับสมัคร',
}
export default interface Program {
    id: number,
    company_id:number,
    image: string,
    name: string,
    description: string, // เพิ่มคุณสมบัติ description
    course: string,
    jobs_title:string[],
    qualifications:string[],
    privileges:string[],
    active: ProgramStatus;
  }
  