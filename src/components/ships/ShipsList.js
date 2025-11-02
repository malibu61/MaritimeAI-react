import React, {useState} from "react"
import {Button, Card, Col, Input, Row, Tag, Space, Divider} from "antd";
import {SearchOutlined, CompassOutlined, AimOutlined} from "@ant-design/icons";

const ShipTypeInfo = {
    0: {name: "Other", color: "blue"},
    1: {name: "Wing In Ground", color: "purple"},
    2: {name: "Towing", color: "green"},
    3: {name: "Port Tender", color: "orange"},
    4: {name: "High Speed Craft", color: "volcano"},
    5: {name: "Diving", color: "lime"},
    6: {name: "Passenger", color: "geekblue"},
    7: {name: "Cargo", color: "magenta"},
    8: {name: "Tanker", color: "red"},
    9: {name: "Pleasure Craft", color: "yellow"},
    10: {name: "Fishing", color: "gold"}
}

const ShipListComponent = (props) => {

    const {ships, goToShip} = props
    const [searchText, setSearchText] = useState("")

    const filteredShips = ships.filter(ship =>
        ship.Name.toLowerCase().includes(searchText.toLowerCase())
    )

    return (
        <React.Fragment>
            <Space direction="vertical" style={{width: '100%'}} size="middle">
                <div>
                    <Input
                        size="large"
                        placeholder="Gemi adına göre ara..."
                        prefix={<SearchOutlined style={{color: '#1890ff'}}/>}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        allowClear
                        style={{borderRadius: 8}}
                    />
                </div>

                <div style={{
                    height: '520px',
                    overflowY: 'auto',
                    paddingRight: 8
                }}>
                    {filteredShips.length > 0 ? (
                        <Space direction="vertical" style={{width: '100%'}} size="small">
                            {filteredShips.map((ship) => (
                                <Card
                                    key={ship.MMSI}
                                    hoverable
                                    style={{
                                        borderRadius: 12,
                                        border: '1px solid #e8e8e8',
                                        transition: 'all 0.3s ease',
                                    }}
                                    bodyStyle={{padding: 16}}
                                >
                                    <div style={{marginBottom: 12}}>
                                        <Row justify="space-between" align="middle">
                                            <Col>
                                                <Space>
                                                    <Tag color={ShipTypeInfo[ship.Type]?.color || "default"}>
                                                        {ShipTypeInfo[ship.Type]?.name || "Bilinmiyor"}
                                                    </Tag>
                                                    <strong style={{fontSize: 15, color: '#1890ff'}}>
                                                        {ship.Name}
                                                    </strong>
                                                </Space>
                                            </Col>
                                        </Row>
                                        <div style={{
                                            fontSize: 12,
                                            color: '#999',
                                            marginTop: 4
                                        }}>
                                            MMSI: {ship.MMSI}
                                        </div>
                                    </div>

                                    <Divider style={{margin: '12px 0'}}/>

                                    {/* Gemi Bilgileri */}
                                    <Row gutter={[16, 8]} style={{marginBottom: 12}}>
                                        <Col span={12}>
                                            <div style={{fontSize: 12, color: '#666'}}>
                                                Pozisyon
                                            </div>
                                            <div style={{fontSize: 13, marginTop: 4}}>
                                                <div>{ship.Latitude.toFixed(4)}° K</div>
                                                <div>{ship.Longitude.toFixed(4)}° D</div>
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <div style={{fontSize: 12, color: '#666'}}>
                                                Rota/Sürat
                                            </div>
                                            <div style={{fontSize: 13, marginTop: 4}}>
                                                <div>
                                                    <CompassOutlined/> {ship.Speed} KTS
                                                </div>
                                                <div>
                                                    <AimOutlined/> {ship.Course}°
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Button
                                        type="primary"
                                        block
                                        size="middle"
                                        icon={<AimOutlined/>}
                                        style={{
                                            borderRadius: 8,
                                            height: 38,
                                            fontWeight: 500
                                        }}
                                        onClick={() => goToShip(ship)}
                                    >
                                        Haritada Göster
                                    </Button>
                                </Card>
                            ))}
                        </Space>
                    ) : (
                        <div style={{
                            textAlign: 'center',
                            marginTop: 100,
                            color: '#999'
                        }}>
                            <SearchOutlined style={{fontSize: 48, marginBottom: 16}}/>
                            <div style={{fontSize: 16}}>Gemi bulunamadı</div>
                            <div style={{fontSize: 13, marginTop: 8}}>
                                Farklı bir arama yapın
                            </div>
                        </div>
                    )}
                </div>
            </Space>
        </React.Fragment>
    )
}

export default ShipListComponent