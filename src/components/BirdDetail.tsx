import type { Bird } from "../models/bird";
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

  return (
    <div>
      <img src={`/images/${bird.image}`} alt={bird.name} />
      <h1>{bird.name}</h1>
      <p>{bird.description}</p>
      <p>{bird.scientificName}</p>
    </div>
  );
}
