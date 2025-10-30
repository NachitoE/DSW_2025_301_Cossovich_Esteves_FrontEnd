import type { BirdVisualTrait, FilterOptionsDTO } from "shared-types";

type FilterSelectorProps = {
  filterOption: FilterOptionsDTO;
  allTraits: BirdVisualTrait[];
  handleSelectFilter: (filterName: string, id: string) => void;
  selectedOption?: string;
};

export default function FilterSelector({
  filterOption,
  allTraits,
  handleSelectFilter,
  selectedOption = "",
}: FilterSelectorProps) {
  const getName = (option: string) => {
    const trait = allTraits.find((t) => String(t.id) === String(option));
    return trait?.description ?? "Desconocido";
  };

  return (
    <div className="mb-4">
      <p className="font-semibold mb-2">{filterOption.filter}</p>
      <div className="flex flex-col gap-2">
        {filterOption.options.map((option) => {
          const isSelected = option === String(selectedOption);
          return (
            <label key={option} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={filterOption.filter}
                value={option}
                checked={isSelected}
                onChange={() => handleSelectFilter(filterOption.filter, option)}
                onClick={() => {
                  if (isSelected) handleSelectFilter(filterOption.filter, "");
                }}
                className="w-4 h-4"
              />
              <span>{getName(option)}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}