export type UserRole = "owner" | "developer" | "commune" | "admin";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  first_name: string;
  last_name: string;
  phone?: string;
  city?: string;
  companyName?: string;
  registrationNumber?: string;
  communeName?: string;
  region?: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  role: UserRole;
  acceptTerms: boolean;
  companyName?: string;
  registrationNumber?: string;
  communeName?: string;
  region?: string;
}