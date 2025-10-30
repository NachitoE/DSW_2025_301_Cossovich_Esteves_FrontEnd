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
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilterOptionDTO[]>(
    []
  );

  const [showFilters, setShowFilters] = useState<boolean>(false);

  const onChangeOptionHandler = (filterName: string, id: string) => {
    setSelectedFilters((prev) => {
      if (id === "") {
        return prev.filter((x) => x.filter !== filterName);
      }
      const exists = prev.some((x) => x.filter === filterName);
      const next = exists
        ? prev.map((x) => (x.filter === filterName ? { ...x, option: id } : x))
        : [...prev, { filter: filterName, option: id }];
      return next;
    });
  };

  const getSelectedOptionFor = (filterName: string) =>
    selectedFilters.find((x) => x.filter === filterName)?.option ?? "";

  useEffect(() => {
    getAllBirdVisualTraits().then((data) => {
      setAllTraits(data);
    });
    getFilters().then((data) => {
      setFilters(data);
    });
    getAllBirds().then((data) => {
      setBirds(data);
    });
  }, []);

  useEffect(() => {
    getFilteredBirds(selectedFilters).then((data) => {
      setBirds(data);
    });
  }, [selectedFilters]);

  const selectedCount = selectedFilters.length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4">

        <div className="flex items-center gap-3">
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
                {selectedCount} filtro
                {selectedCount > 1 ? "s" : ""} activo
                {selectedCount > 1 ? "s" : ""}
              </span>
            ) : (
              <span>Sin filtros</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        <aside
          className={`flex-shrink-0 transition-all duration-125 bg-white rounded-lg shadow p-4 overflow-hidden ${
            showFilters ? "w-50 opacity-100 h-min" : "w-0 p-0 opacity-0"
          }`}
          aria-hidden={!showFilters}
        >
          {showFilters && (
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
          )}
        </aside>
        <main className="flex-1">
          <BirdList birds={birds} onClick={onClick} />
        </main>
      </div>
    </div>
  );
}