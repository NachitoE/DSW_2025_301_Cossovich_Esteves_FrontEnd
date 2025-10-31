import { isServiceOn } from "@/api";
import { useEffect, useState } from "react";
import { ThreeDots  } from 'react-loading-icons'

type MainRendererProps = {
children: React.ReactNode
}

export default function MainRenderer({children}: MainRendererProps){
    const[isOn, setIsOn] = useState(false)
    const[fetched, setFetched] = useState(false)

    useEffect(() => {
        isServiceOn().then((isOn) => {
            setIsOn(isOn);
            setFetched(true);
        })
        
    })
    return(
        <div>
        {!fetched && <main className="flex items-center justify-center w-full h-screen"><ThreeDots stroke="#000000" fill="#98ff98"></ThreeDots ></main>}
        {!isOn && fetched && <main className="flex items-center justify-center w-full h-screen"><span className="walter-turncoat-regular text-2xl">Nuestros servicios no están funcionando actualmente, por favor intenta ingresar más tarde.</span></main>}
        {isOn && <main className="flex-grow p-6 w-96 mx-auto w-full">{children}</main>}
        </div>
    )
}