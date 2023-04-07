export default interface Applicant {
    id:number | string,
    firstName:string,
    lastName:string,
    fullName?:string, //ลบ
    email:string,
    birthDate:string,
    gender:string,
    position?:string, //ลบ
    address:string,
    phone:string,
    resume?:string,
    transcript?:string,
    portfolio?:string,
}