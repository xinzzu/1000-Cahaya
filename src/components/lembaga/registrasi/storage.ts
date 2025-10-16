import { OrgAssets, Building, Vehicle, ID } from "./types";
import { STORAGE_KEY } from "./constants";

const empty: OrgAssets = { buildings: [], vehicles: [] };

export function loadAssets(): OrgAssets {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as OrgAssets) : empty;
  } catch { return empty; }
}

function persist(data: OrgAssets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function addBuilding(b: Building) {
  const d = loadAssets();
  d.buildings.push(b);
  persist(d);
}
export function removeBuilding(id: ID) {
  const d = loadAssets();
  d.buildings = d.buildings.filter(x => x.id !== id);
  persist(d);
}

export function addVehicle(v: Vehicle) {
  const d = loadAssets();
  d.vehicles.push(v);
  persist(d);
}
export function removeVehicle(id: ID) {
  const d = loadAssets();
  d.vehicles = d.vehicles.filter(x => x.id !== id);
  persist(d);
}
