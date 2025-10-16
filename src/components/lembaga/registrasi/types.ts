export type ID = string;

export type Building = {
  id: ID;
  name: string;
  area?: number; // m2
};

export type VehicleType = "Mobil" | "Motor" | "Bus" | "Truk" | "Minibus";
export type FuelType    = "Bensin" | "Solar" | "Listrik" | "Hybrid";

export type Vehicle = {
  id: ID;
  name: string;
  vehicleType?: VehicleType;
  fuelType?: FuelType;
};

export type OrgAssets = {
  buildings: Building[];
  vehicles:  Vehicle[];
};
