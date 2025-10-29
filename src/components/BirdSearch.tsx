import { useEffect, useState } from "react";
import BirdList from "./BirdList";
import FilterSelector from "./FilterSelector";
import { getAllBirds, getAllBirdVisualTraits, getFilters } from "@/api";
import { type BirdVisualTrait, type Bird, type FilterOptionsDTO } from "shared-types";

type BirdSearchProps = {
    onClick: (bird: Bird) => void
}
export default function BirdSearch({onClick}: BirdSearchProps){
    const [birds, setBirds] = useState<Bird[]>([]);
    const [filters, setFilters] = useState<FilterOptionsDTO[]>([]);
    const [allTraits, setAllTraits]= useState<BirdVisualTrait[]>([]);

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

    
    return(
    <div>
        {filters.map(filter=>{
        return(<FilterSelector filterOption={filter} allTraits={allTraits}></FilterSelector>)
        })}
        <BirdList birds={birds} onClick={onClick}></BirdList>
    </div>
    )
}