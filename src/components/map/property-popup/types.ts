export interface PropertyDocument {
  id: string;
  name: string;
  file_path: string;
  document_type: string;
  created_at: string;
}

export interface PropertyDocumentsProps {
  parcel: {
    id: string;
    owner: string;
  };
}