import {getShipsWZoom1Service} from "../services/ships";
import React, {useEffect, useState} from "react";
import {MapContainerComponent} from "../components/ships/map/Map";
import {Card} from "antd"

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

        <React.Fragment>
            <h1>ShipsPage</h1>

            {loading ? (
                    <div>
                        ...Yükleniyor...
                    </div>
                ) :
                <div>
                    <Card style={{height: '600px'}}>
                        <MapContainerComponent ships={ships}/>
                    </Card>
                </div>


            }


        </React.Fragment>
    )

}

export default Ships;