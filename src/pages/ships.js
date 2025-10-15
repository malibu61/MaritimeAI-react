import {getShipsWZoom1Service, getAllShipsService, getAllShipsWSignalRService} from "../services/ships";
import React, {useEffect, useRef, useState} from "react";
import {MapContainerComponent} from "../components/ships/map/Map";
import {Card, Row, Col, Flex, Spin} from "antd"
import ShipListComponent from "../components/ships/ShipsList";

const Ships = () => {

    const [ships, setShips] = useState([])
    const [loading, setLoading] = useState(true)
    const markerRefs = useRef({})
    const mapRef = useRef(null)

    const goToShip = (ship) => {
        mapRef.current.flyTo([ship.Latitude, ship.Longitude], 12, {               // gemiye zoom yapma kısmı
            duration: 3                                                           //mapRef, haritanın referansını alır. ve işlemlerin hanngi haritada olacağına karar verir
        })

        const marker = markerRefs.current[ship.MMSI]                              // pop-up'ı açtığımız kısım
        marker.openPopup()
    }

    useEffect(() => {
       getAllShips()
    }, [])

    const getAllShips = () =>{
        getAllShipsService({
                minLat: 33.779147331286474,
                maxLat: 44.008620115415354,
                minLon: 23.64242583488468,
                maxLon: 42.64877349113469,
                zoom: 6
        }).then((res) => {
            console.log("res: ", res)
            console.log("res: ", res.message)
            setShips(res)
            setLoading(false)
        })
    }

    return (

        <React.Fragment>


            <Row gutter={16} style={{margin: 30}}>


                {loading ? (<Col span={24}>
                    <div>
                        <Flex align="center" justify="center" style={{width: "100%", minHeight: "650px"}}>
                            <div style={{
                                display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '650px'
                            }}>
                                <Spin tip="Yükleniyor" size="large"/>
                            </div>
                        </Flex>
                    </div>
                </Col>) : <>
                    <Col span={16}>
                        <Card style={{height: "650px"}}>
                            <MapContainerComponent
                                ships={ships}
                                setShips={setShips}
                                markerRefs={markerRefs}
                                mapRef={mapRef}/>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card style={{height: "650px"}}>
                            <ShipListComponent
                                ships={ships}
                                goToShip={goToShip}
                            />
                        </Card>
                    </Col>
                </>

                }

            </Row>


        </React.Fragment>)

}

export default Ships;