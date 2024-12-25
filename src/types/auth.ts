export type UserRole = "taxpayer" | "developer" | "commune";

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  city: string;
  acceptTerms: boolean;
}