import { useEffect, useState } from "react";
import BirdList from "./BirdList";
import FilterSelector from "./FilterSelector";
import {
  getAllBirds,
  getAllBirdVisualTraits,
  getFilteredBirds,
  getFilters,
} from "@/api";
import type {
  BirdVisualTrait,
  Bird,
  FilterOptionsDTO,
  SelectedFilterOptionDTO,
} from "shared-types";

type BirdSearchProps = {
  onClick: (bird: Bird) => void;
};

export default function BirdSearch({ onClick }: BirdSearchProps) {
  const [birds, setBirds] = useState<Bird[]>([]);
  const [filters, setFilters] = useState<FilterOptionsDTO[]>([]);
  const [allTraits, setAllTraits] = useState<BirdVisualTrait[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilterOptionDTO[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const onChangeOptionHandler = (filterName: string, id: string) => {
    setSelectedFilters((prev) => {
      if (id === "") return prev.filter((x) => x.filter !== filterName);
      const exists = prev.some((x) => x.filter === filterName);
      return exists
        ? prev.map((x) => (x.filter === filterName ? { ...x, option: id } : x))
        : [...prev, { filter: filterName, option: id }];
    });
  };

  const getSelectedOptionFor = (filterName: string) =>
    selectedFilters.find((x) => x.filter === filterName)?.option ?? "";

  useEffect(() => {
    getAllBirdVisualTraits().then(setAllTraits);
    getFilters().then(setFilters);
    getAllBirds().then(setBirds);
  }, []);

  useEffect(() => {
    getFilteredBirds(selectedFilters).then(setBirds);
  }, [selectedFilters]);

  const selectedCount = selectedFilters.length;

  return (
    <div>
      <div className="flex gap-6 items-start">
        <main className=" order-last">
          <BirdList birds={birds} onClick={onClick} />
        </main>

        <aside className="w-64 flex-shrink-0 order-first">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowFilters((s) => !s)}
              className="px-3 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700 transition"
            >
              {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
            </button>
            <div className="text-sm text-gray-600">
              {selectedCount > 0 ? (
                <span>
                  {selectedCount} filtro{selectedCount > 1 ? "s" : ""} activo
                  {selectedCount > 1 ? "s" : ""}
                </span>
              ) : (
                <span>Sin filtros</span>
              )}
            </div>
          </div>

          <div
            className={`mt-3 bg-white rounded-lg shadow p-4 overflow-hidden transform-gpu origin-top transition-all duration-200 ${
              showFilters
                ? "opacity-100 scale-y-100 max-h-[70vh]"
                : "opacity-0 scale-y-0 max-h-0"
            }`}
            aria-hidden={!showFilters}
          >
            <div className="space-y-4">
              <h2 className="font-semibold">Filtros</h2>
              <div>
                {filters.length === 0 ? (
                  <p className="text-sm text-gray-500">Cargando filtros...</p>
                ) : (
                  filters.map((filter) => (
                    <FilterSelector
                      key={filter.filter}
                      filterOption={filter}
                      allTraits={allTraits}
                      handleSelectFilter={onChangeOptionHandler}
                      selectedOption={getSelectedOptionFor(filter.filter)}
                    />
                  ))
                )}
              </div>

              <div className="pt-2 border-t mt-2">
                <button
                  type="button"
                  onClick={() => setSelectedFilters([])}
                  className="w-full mt-2 px-3 py-2 text-sm border rounded text-gray-700 hover:bg-gray-50"
                >
                  Limpiar todos
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
