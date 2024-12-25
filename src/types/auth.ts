export type UserRole = "taxpayer" | "developer" | "commune";

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
}