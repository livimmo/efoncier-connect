export interface ReportData {
  referenceNumber: string;
  date: string;
  taxpayer: {
    name: string;
    fiscalId: string;
  };
  parcel: {
    id: string;
    location: string;
    area: number;
    amount: number;
    transactionRef: string;
  };
}

export type ReportType = 'payment' | 'property' | 'activity';