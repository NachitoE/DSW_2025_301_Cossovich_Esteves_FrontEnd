import { useEffect } from "react";
import type { Bird } from "shared-types";
import BirdCard from "./BirdCard";

type BirdListProps = {
  birds: Bird[];
  onClick: (bird: Bird) => void;
};

function BirdList(props: BirdListProps) {
  const { birds, onClick } = props;

  useEffect(() => {
    document.title = "🐦Aves - Avistandoo🐦";
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-semibold text-center">🐦 Aves 🐦</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {birds.map((bird) => (
          <BirdCard
            key={bird.id}
            bird={bird}
            onClickEvent={() => onClick(bird)}
          />
        ))}
      </div>
    </div>
  );
}
export default BirdList;
