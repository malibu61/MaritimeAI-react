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
        const eventSource = new EventSource("https://localhost:7170/api/Ships/GetShipsWZoom1");     //URL'i sürekli dinleme

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setShips(data);
            setLoading(false);
            console.log("Yeni veri:", data);
        };

        eventSource.onerror = (err) => {
            console.error("SSE hatası:", err);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [])

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