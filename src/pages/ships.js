import {getAllShipsService} from "../services/ships";
import React, {useEffect, useRef, useState} from "react";
import {MapContainerComponent} from "../components/ships/map/Map";
import {Card, Col, Flex, Row} from "antd"
import ShipListComponent from "../components/ships/ShipsList";
import MaritimeLogo from "../../src/logo/maritime-ai-small-icon-logo.svg"

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

    const getAllShips = () => {
        getAllShipsService({
            minLat: 33.779147331286474,
            maxLat: 44.008620115415354,
            minLon: 23.64242583488468,
            maxLon: 42.64877349113469,
            zoom: 6
        }).then((res) => {
            setShips(res)
            setLoading(false)
        })
    }

    const IconSpinner = () => (
        <div style={{
            animation: 'spin 5s linear infinite',
            display: 'inline-block'
        }}>
            <img src={MaritimeLogo} alt="MaritimeAI" style={{width: '100px'}}/>
        </div>
    );

    return (

        <React.Fragment>
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>


            <Row gutter={16} style={{margin: 30}}>


                {loading ? (<Col span={24}>
                    <div>
                        <Flex align="center" justify="center" style={{width: "100%", minHeight: "650px"}}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minHeight: 300,
                                gap: 16
                            }}>
                                <IconSpinner/>
                                <div style={{color: '#1890ff', fontSize: 16}}>
                                    Harita yükleniyor...
                                </div>
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