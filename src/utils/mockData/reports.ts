import { ReportData } from "@/types/reports";

export const getReportData = (type: string): ReportData => {
  const baseData = {
    date: new Date().toISOString(),
    taxpayer: {
      name: "John Doe",
      fiscalId: "FIS123456"
    }
  };

  switch (type) {
    case 'payment':
      return {
        ...baseData,
        referenceNumber: "PAY-2024-001",
        parcel: {
          id: "PARC-001",
          location: "123 Rue Example, Casablanca",
          area: 500,
          amount: 1500,
          transactionRef: "TXN-123456"
        }
      };
    case 'property':
      return {
        ...baseData,
        referenceNumber: "PROP-2024-001",
        parcel: {
          id: "PARC-002",
          location: "456 Avenue Hassan II, Rabat",
          area: 750,
          amount: 2000,
          transactionRef: "TXN-789012"
        }
      };
    case 'activity':
      return {
        ...baseData,
        referenceNumber: "ACT-2024-001",
        parcel: {
          id: "PARC-003",
          location: "789 Boulevard Mohammed V, Marrakech",
          area: 1000,
          amount: 2500,
          transactionRef: "TXN-345678"
        }
      };
    default:
      throw new Error("Type de rapport invalide");
  }
};