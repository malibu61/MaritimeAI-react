import {getAllShipsService, getShipsWZoom1Service} from "../services/ships";
import {useEffect, useState} from "react";

const Ships = () => {

    const [ships, setShips] = useState(null)
    useEffect(() => {
        getShipsWZoom1()
    }, [])

    const getShipsWZoom1 = () => {
        getShipsWZoom1Service().then(response => {console.log(response)})
    }

    return (

        <>
            <h1>ShipsPage</h1>
        </>
    )

}

export default Ships;