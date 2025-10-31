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
      {/* items-stretch para que cada celda tenga la misma altura */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-stretch">
        {birds.map((bird) => (
          <BirdCard key={bird.id} bird={bird} onClickEvent={() => onClick(bird)} />
        ))}
      </div>
    </div>
  );
}