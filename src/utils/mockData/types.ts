export interface Location {
  id: string;
  name: string;
  center: {
    lat: number;
    lng: number;
  };
  cities: City[];
}

export interface City {
  name: string;
  communes: string[];
}

export interface ParcelInput {
  id: string;
  title: string;
  type: string;
  surface: number;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  owner: string;
  status: string;
  taxStatus: string;
  zone: string;
  price?: number;
}

export interface Parcel extends ParcelInput {
  price: number;
}