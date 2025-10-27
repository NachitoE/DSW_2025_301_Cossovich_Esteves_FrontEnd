import { useEffect, useState } from "react";
import BirdList from "./BirdList";
import FilterSelector from "./FilterSelector";
import { getAllBirds } from "@/api";
import type { Bird } from "shared-types";

type BirdSearchProps = {
    onClick: (bird: Bird) => void
}
export default function BirdSearch({onClick}: BirdSearchProps){
    const [birds, setBirds] = useState<Bird[]>([]);

    useEffect(() => {
        getAllBirds().then((data) => {
            console.log("data:", data);
            setBirds(data);
        });
    }, []);

    
    return(
    <div>
        <FilterSelector></FilterSelector>
        <BirdList birds={birds} onClick={onClick}></BirdList>
    </div>
    )
}