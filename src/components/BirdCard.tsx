import type { Bird } from "shared-types";

interface BirdCardProps {
  bird: Bird;
  onClickEvent: () => void;
}

export default function BirdCard({ bird, onClickEvent }: BirdCardProps) {
  return (
    <div
      className="group bg-white dark:bg-blue-950 shadow-lg rounded-xl overflow-hidden w-full max-w-sm cursor-pointer hover:shadow-2xl transition-shadow"
      onClick={onClickEvent}
    >
      <div className="relative w-100 mx-auto h-48 overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
          src={`/images/${bird.imageURL}`}
          alt={bird.scientificName}
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {bird.name}
        </h2>
        <h4 className="italic text-sm text-gray-600 dark:text-gray-300 underline">
          {bird.scientificName}
        </h4>
        <p className="mt-2 text-gray-700 dark:text-gray-200 line-clamp-3">
          {bird.description}
        </p>
      </div>
    </div>
  );
}
