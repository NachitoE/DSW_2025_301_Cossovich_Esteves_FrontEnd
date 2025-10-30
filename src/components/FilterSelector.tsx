import type { BirdVisualTrait, FilterOptionsDTO, SelectedFilterOptionDTO } from "shared-types";


type FilterSelectorProps =  {
    filterOption : FilterOptionsDTO;
    allTraits : Array<BirdVisualTrait>
    handleSelectFilter: (filterName: string, id: string) => void;
}

export default function FilterSelector({filterOption, allTraits, handleSelectFilter}: FilterSelectorProps){
    
    const getName  = (option:string) => {
        const trait = allTraits.find((t) => String(t.id) === String(option));
        return trait?.description ?? "Desconocido";
    }


    return(
    <p>
    {filterOption.filter}
    {filterOption.options.map(option=>{
        return( <label>
        <input type="radio" name={filterOption.filter} value={option} onChange={e => handleSelectFilter(filterOption.filter, e.target.value)} />
        {getName(option)}
    </label>)
    })}
      </p>);
}