export interface UserAccountDetails {
  id: string
  name: string;
  username: string;
  password: string;
  role: "patient" | "doctor" | "system admin";
  phone: string,
  email: string,
  result?: any;
}
  