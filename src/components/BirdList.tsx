import { useEffect } from "react";
import type { Bird, SelectedFilterOptionDTO } from "shared-types";
import { BirdCard } from "@components/BirdCard";

type BirdListProps = {
  birds: Bird[];
  onClick: (bird: Bird) => void;
};

export default function BirdList({ birds, onClick }: BirdListProps) {
  useEffect(() => {
    document.title = "Aves - Avistandoo";
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-center mb-8 text-lime-700 drop-shadow-lg">
        Aves
      </h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {birds.map((bird) => (
          <BirdCard key={bird.id} bird={bird} onClickEvent={() => onClick(bird)} />
        ))}
      </div>
    </div>
  );
}