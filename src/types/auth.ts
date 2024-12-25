export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  role: "taxpayer" | "developer" | "commune";
  acceptTerms: boolean;
}