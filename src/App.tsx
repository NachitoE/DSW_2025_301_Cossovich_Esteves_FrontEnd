import { useEffect, useState } from "react";
import type { Bird } from "./models/bird";
import Layout from "./components/Layout";
import BirdList from "./components/BirdList";
import BirdDetail from "./components/BirdDetail";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getAllBirds } from "./api";

function App() {
  const [birds, setBirds] = useState<Bird[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllBirds().then((data) => {
      console.log("data:", data);
      setBirds(data);
    });
  }, []);

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <BirdList
              birds={birds}
              onClick={(b) => {
                navigate(`/birds/${b.id}`);
              }}
            />
          }
        />
        <Route path="/birds/:id" element={<BirdDetail />} />
      </Routes>
    </Layout>
  );
}

export default App;
