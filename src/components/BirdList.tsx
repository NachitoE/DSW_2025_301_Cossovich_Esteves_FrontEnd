import type { Bird } from "../models/bird";
import BirdCard from "./BirdCard";

type BirdListProps = {
  birds: Bird[];
};

function BirdList(props: BirdListProps) {
  return (
    <div>
      <h1>🐦 Aves</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {props.birds.map((bird) => (
          <BirdCard
            key={bird.id}
            bird={bird}
            onClickEvent={() => console.log("a")}
          />
        ))}
      </div>
    </div>
  );
}
export default BirdList;
