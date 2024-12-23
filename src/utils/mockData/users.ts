import { User } from './types';

export const mockUsers: User[] = [
  {
    id: "USER001",
    name: "Hassan Alami",
    email: "hassan.alami@email.com",
    role: "TAXPAYER",
    phone: "+212 661-234567",
    parcels: ["TF123456", "TF901234"]
  },
  {
    id: "USER002",
    name: "Fatima Benani",
    email: "fatima.benani@email.com",
    role: "TAXPAYER",
    phone: "+212 662-345678",
    parcels: ["TF789012"]
  },
  {
    id: "USER003",
    name: "Groupe Immobilier Atlas",
    email: "contact@atlas-immo.ma",
    role: "DEVELOPER",
    phone: "+212 522-987654",
    parcels: ["TF345678"]
  },
  {
    id: "USER004",
    name: "Société Al Omrane",
    email: "info@alomrane.gov.ma",
    role: "DEVELOPER",
    phone: "+212 539-876543",
    parcels: ["TF567890"]
  },
  {
    id: "USER005",
    name: "Karim Benjelloun",
    email: "karim.benjelloun@email.com",
    role: "TAXPAYER",
    phone: "+212 663-456789",
    parcels: ["TF654321"]
  },
  {
    id: "USER006",
    name: "Société Immobilière Marrakech",
    email: "contact@sim-marrakech.ma",
    role: "DEVELOPER",
    phone: "+212 524-123456",
    parcels: ["TF987654"]
  },
  {
    id: "ADMIN001",
    name: "Mohammed Tazi",
    email: "m.tazi@efoncier.gov.ma",
    role: "ADMIN",
    phone: "+212 537-123456"
  }
];