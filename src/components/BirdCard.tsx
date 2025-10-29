import type { Bird } from "shared-types";
import FadeContent from "./FadeContent";

interface BirdCardProps {
  bird: Bird;
  onClickEvent: () => void;
}

export function BirdCard({ bird, onClickEvent }: BirdCardProps) {
  return (
    <FadeContent blur={false} duration={400} easing="ease-out" initialOpacity={0}>
      <div
        className="group bg-white/80 shadow-xl ring-2 ring-lime-400 rounded-2xl overflow-hidden w-full cursor-pointer hover:scale-105 transition-transform duration-300 h-full flex flex-col"
        onClick={onClickEvent}
      >
        <div className="relative w-full h-48 overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
            src={bird.imageURL}
            alt={bird.scientificName}
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-4 py-2">
            <h2 className="text-lg font-bold text-white">{bird.name}</h2>
            <h4 className="italic text-xs text-lime-200">{bird.scientificName}</h4>
          </div>
        </div>
        <div className="p-4 flex-1">
          <p className="text-gray-700 dark:text-gray-200 line-clamp-3 text-sm">
            {bird.description}
          </p>
        </div>
      </div>
    </FadeContent>
  );
}