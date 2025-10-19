import React, {useState} from "react"
import {Button, Card, Col, Input, Row, Tag} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const ShipListComponent = (props) => {

    const {ships, goToShip} = props
    const [searchText, setSearchText] = useState("")

    const filteredShips = ships.filter(ship =>
        ship.Name.toLowerCase().includes(searchText.toLowerCase())
    )

    return (
        <React.Fragment>

            <Input
                placeholder="Gemi Ara"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
            />

            <div style={{
                height: '570px',
                overflowY: 'auto',
            }}>

                {filteredShips.length > 0 ? (

                    filteredShips.map((ship, index) => (
                        <Card.Grid style={{
                            height: "170px",
                            width: "100%",
                            margin: "8px 0",
                            backgroundColor: '#D3F2F5',
                            borderRadius: 10
                        }}>

                            <Row key={ship.MMSI}>
                                <Col span={10}>
                                    <div style={{textAlign: "justify"}}>
                                        <p><strong>Gemi Adı:</strong><Tag color="warning">{ship.Name}</Tag></p>
                                        <p><strong>MMSI:</strong> {ship.MMSI}</p>
                                        <p><strong>Enlem:</strong> {ship.Latitude} K</p>
                                    </div>
                                </Col>
                                <Col span={9}>
                                    <div style={{textAlign: "justify"}}>
                                        <p><strong>Boylam:</strong> {ship.Longitude} D</p>
                                        <p><strong>Sürat:</strong> {ship.Speed} KTS</p>
                                        <p><strong>Rota:</strong> {ship.Course}° </p>
                                    </div>
                                </Col>
                                <Col span={5} style={{display: "flex"}}>
                                    <Button
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            backgroundColor: "#2e86de",
                                            color: "white"
                                        }}
                                        onClick={() => {
                                            goToShip(ship)
                                        }}>
                                        Gemiye Git
                                    < /Button>
                                </Col>
                            </Row>
                        </Card.Grid>
                    ))
                ) : (
                    <div style={{textAlign: 'center', marginTop: '20px', color: '#999'}}>
                        Gemi bulunamadı
                    </div>
                )}
            </div>

        </React.Fragment>
    )

}

export default ShipListComponent