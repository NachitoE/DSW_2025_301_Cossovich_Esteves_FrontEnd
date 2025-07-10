import type { Bird } from "../models/bird";

interface BirdCardProps {
  bird: Bird;
  onClickEvent: () => void;
}

export default function BirdCard({ bird, onClickEvent }: BirdCardProps) {
  return (
    <div
      className="bg-white dark:bg-blue-950 shadow-lg rounded-xl overflow-hidden w-full max-w-sm cursor-pointer hover:shadow-xl transition-shadow"
      onClick={onClickEvent}
    >
      <img
        className="w-3/4 mx-auto rounded h-48 object-cover object-top"
        src={`/images/${bird.image}`}
        alt={bird.scientificName}
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {bird.name}
        </h2>
        <h4 className="italic text-sm text-gray-600 dark:text-gray-300">
          {bird.scientificName}
        </h4>
        <p className="mt-2 text-gray-700 dark:text-gray-200 line-clamp-3">
          {bird.description}
        </p>
      </div>
    </div>
  );
}
