export interface UserAccountDetails {
    id: string;
    name: string;
    username: string;
    password: string;
    role: "patient" | "doctor" | "system admin" | "researcher";
    phone_number: string;
    email: string;
    result?: any;
}

export interface ReportDetails {
    id: string;
    patient_id: string;
    patient_name: string;
    doctor_id: string;
    image: string;
    date: string;
    status: "Covid" | "Normal";
    approved: boolean;
}
