import type { BirdVisualTrait, FilterOptionsDTO } from "shared-types";


type FilterSelectorProps =  {
    filterOption : FilterOptionsDTO;
    allTraits : Array<BirdVisualTrait>
}

export default function FilterSelector({filterOption, allTraits}: FilterSelectorProps){
    
    const getName  = (option:string) => {
        const trait = allTraits.find((t) => String(t.id) === String(option));
        return trait?.description ?? "Desconocido";
    }

    return(
    <p>
    {filterOption.filter}
    {filterOption.options.map(option=>{
        return( <label>
        <input type="radio" name="myRadio" value="option1" />
        {getName(option )}
    </label>)
    })}
      </p>);
}