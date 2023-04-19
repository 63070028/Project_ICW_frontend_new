export default interface Job {
    id:string,
    company_id:string,
    company_name:string,
    name:string,
    salary_per_day:number,
    location:string,
    capacity:number,
    detail:string,
    interview:string,
    qualifications:string[],
    contact: {
        name: string;
        email: string;
        phone: string;
      },
    creation_date:string
    state:string
}