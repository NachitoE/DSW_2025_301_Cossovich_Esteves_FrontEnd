import type { Bird } from "./models/bird";

export const API_URL = "http://localhost:3000";
export const API_GET_ALL_BIRDS_URL = `${API_URL}/api/birds`;
export const API_GET_BIRD_URL = `${API_URL}/api/birds`;

export async function getAllBirds(): Promise<Bird[]> {
  const res = await fetch(API_GET_ALL_BIRDS_URL);
  const json = await res.json();
  return json.data;
}

export async function getBirdById(id: string): Promise<Bird> {
  const res = await fetch(`${API_GET_BIRD_URL}/${id}`);
  const json = await res.json();
  return json.data;
}
