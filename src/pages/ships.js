import {getAllShipsService, getShipsWZoom1Service} from "../services/ships";
import React, {useEffect, useState} from "react";

const Ships = () => {

    const [ships, setShips] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getShipsWZoom1()
    }, [])

    const getShipsWZoom1 = () => {
        getShipsWZoom1Service().then(response => {
            setShips(response);
            setLoading(false)
            console.log(response)
        })
    }

    return (

        <>
            <h1>ShipsPage</h1>

            {loading ? (
                <div>
                    ...Yükleniyor...
                </div>
            ) : ships.map((item, index) => {
                return (
                    <React.Fragment key={index}>

                        <p>MMSI: {item.MMSI}</p>
                        <p>Ad: {item.Name}</p>
                        <p>Latitude: {item.Latitude}</p>
                        <p>Longitude: {item.Longitude}</p>

                    </React.Fragment>

                )
            })}


        </>
    )

}

export default Ships;