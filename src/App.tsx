import { useEffect, useState } from "react";
import type { Bird } from "./models/bird";
import Layout from "./components/Layout";
import BirdList from "./components/BirdList";

const API_URL = "http://localhost:3000";
const API_GET_ALL_BIRDS_URL = `${API_URL}/api/birds`;

function App() {
  const [birds, setBirds] = useState<Bird[]>([]);

  useEffect(() => {
    getAllBirds().then((data) => {
      console.log("data:", data);
      setBirds(data);
    });
  }, []);

  return (
    <Layout>
      <BirdList birds={birds}></BirdList>
    </Layout>
  );
}

export async function getAllBirds(): Promise<Bird[]> {
  const res = await fetch(API_GET_ALL_BIRDS_URL);
  const json = await res.json();
  return json.data;
}

export default App;
