import { useEffect, useState } from "react";
import type { Bird } from "./models/bird";
import BirdCard from "./components/BirdCard";

const API_URL = "http://localhost:3000";
const API_GET_ALL_BIRDS_URL = `${API_URL}/api/birds`;

function App() {
  const [birds, setBirds] = useState<Bird[]>([]);

  useEffect(() => {
    getAllBirds().then((data) => {
      console.log("data:", data);; 
      setBirds(data)}
    );
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🐦 Aves</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {birds.map(bird => (
          <BirdCard key={bird.id} bird={bird} />
        ))}
      </div>
    </div>
  );
}

export async function getAllBirds(): Promise<Bird[]> {
  const res = await fetch(API_GET_ALL_BIRDS_URL);
  const json = await res.json();
  return json.data;
}

export default App;
