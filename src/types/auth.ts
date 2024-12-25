export type UserRole = "owner" | "developer" | "commune" | "admin";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  first_name: string;
  last_name: string;
  phone?: string;
  city?: string;
  // Champs propriétaire
  cin?: string;
  address?: string;
  // Champs promoteur
  companyName?: string;
  ice?: string;
  rc?: string;
  companyAddress?: string;
  // Champs commune
  communeName?: string;
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
  // Champs propriétaire
  cin?: string;
  address?: string;
  // Champs promoteur
  companyName?: string;
  ice?: string;
  rc?: string;
  companyAddress?: string;
  // Champs commune
  communeName?: string;
}