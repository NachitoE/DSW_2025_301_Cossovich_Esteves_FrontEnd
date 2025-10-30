import { useEffect, useState } from "react";
import BirdList from "./BirdList";
import FilterSelector from "./FilterSelector";
import { getAllBirds, getAllBirdVisualTraits, getFilteredBirds, getFilters } from "@/api";
import { type BirdVisualTrait, type Bird, type FilterOptionsDTO, type SelectedFilterOptionDTO } from "shared-types";

type BirdSearchProps = {
    onClick: (bird: Bird) => void
}
export default function BirdSearch({onClick}: BirdSearchProps){
    const [birds, setBirds] = useState<Bird[]>([]);
    const [filters, setFilters] = useState<FilterOptionsDTO[]>([]);
    const [allTraits, setAllTraits]= useState<BirdVisualTrait[]>([]);
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilterOptionDTO[]>([]);

    const onChangeOptionHandler = (filterName: string, id: string) => {
        setSelectedFilters(prev => {
            const exists = prev.some(x => x.filter === filterName);
            const next = exists
                ? prev.map(x => x.filter === filterName ? { ...x, option: id } : x)
                : [...prev, { filter: filterName, option: id }];
            console.debug("selectedFilters ->", next);
            return next;
        });
    }

    useEffect(() => {
        getAllBirdVisualTraits().then((data)=>{
            setAllTraits(data);
        })
        getFilters().then((data)=>{
        console.log("data:", data);
        setFilters(data);
        })
        getAllBirds().then((data) => {
            console.log("data:", data);
            setBirds(data);
        });
    }, []);

    useEffect(() => {
        getFilteredBirds(selectedFilters).then((data) => {
            setBirds(data)
        })
    }, [selectedFilters])
    
    return(
    <div>
        {filters.map(filter=>{
        return(<FilterSelector key={filter.filter} filterOption={filter} allTraits={allTraits} handleSelectFilter={onChangeOptionHandler}></FilterSelector>)
        })}
        <BirdList birds={birds} onClick={onClick}></BirdList>
    </div>
    )
}