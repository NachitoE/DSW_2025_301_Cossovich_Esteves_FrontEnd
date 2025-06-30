import type { Bird } from "../models/bird";

type Props = {
  bird: Bird;
};

export default function BirdCard({ bird }: Props) {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "1rem",
      maxWidth: "300px",
      boxShadow: "0 0 5px rgba(0,0,0,0.1)",
      backgroundColor: "#fff"
    }}>
      <img
        src={`/images/${bird.image}`}
        alt={bird.name}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <h2>{bird.name}</h2>
      <h4 style={{ fontStyle: "italic", color: "#555" }}>{bird.scientificName}</h4>
      <p>{bird.description}</p>
    </div>
  );
}
