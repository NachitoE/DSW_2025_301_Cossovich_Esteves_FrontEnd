import type { FilterOptionsDTO } from "shared-types";

type FilterSelectorProps =  {
    filterOption : FilterOptionsDTO;
}

export default function FilterSelector({filterOption}: FilterSelectorProps){
    

    return(
    <p>
    BeakShape
    <label>
        <input type="radio" name="myRadio" value="option1" />
        curvado
    </label>
    <label>
        <input type="radio" name="myRadio" value="option2" />
        recto
    </label>
      </p>);
}