import {getShipsWZoom1Service} from "../services/ships";
import React, {useEffect, useRef, useState} from "react";
import {MapContainerComponent} from "../components/ships/map/Map";
import {Card, Row, Col, Flex, Spin} from "antd"
import ShipListComponent from "../components/ships/ShipsList";

const Ships = () => {

    const [ships, setShips] = useState(null)
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
        getShipsWZoom1()
    }, [])

    const getShipsWZoom1 = () => {
        getShipsWZoom1Service().then(response => {
            setShips(response);
            setLoading(false)
        })
    }

    return (

        <React.Fragment>


            <Row gutter={16} style={{margin: 30}}>


                {loading ? (<Col span={24}>
                    <div>
                        <Flex align="center" gap="middle">
                            <Spin tip="Yükleniyor" size="large"/>
                        </Flex>
                    </div>
                </Col>) : <>
                    <Col span={16}>
                        <Card style={{height: "650px"}}>
                            <MapContainerComponent
                                ships={ships}
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