import type { Bird } from "shared-types";
import { useEffect, useState } from "react";
import { getBirdById } from "../api";
import { useParams } from "react-router-dom";

export default function BirdDetail() {
  const [bird, setBird] = useState<Bird | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;
    getBirdById(id).then((bird) => {
      document.title = `🐦${bird.name} - Avistandoo🐦`;
      setBird(bird);
    });
  }, [id]);

  if (!bird) {
    return <div>Cargando...</div>;
  }
  console.log("Bird data:", bird);
  return (
    <div>
      <img src={`${bird.imageURL}`} alt={bird.name} />
      <h1>{bird.name}</h1>
      <p>{bird.description}</p>
      <p>{bird.scientificName}</p>
    </div>
  );
}
