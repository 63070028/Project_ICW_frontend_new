export enum JobStatus {
    Open = 'เปิดรับสมัคร',
    Closed = 'ปิดรับสมัคร',
}

export default interface Job2 {
    id: number;
    company_id: number;
    name: string;
    salary_per_day: number;
    location: string;
    capacity: number;
    detail: string;
    interview: string;
    qualifications: string[];
    contact: { name: string; email: string; phone: string };
    creation_date: string;
    active: JobStatus;
}
