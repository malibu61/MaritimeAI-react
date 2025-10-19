import React, {useEffect, useState} from "react"
import {Card, Col, Row, Statistic} from "antd";
import {AlertOutlined, RadarChartOutlined, RiseOutlined, RocketOutlined,} from "@ant-design/icons";
import * as signalR from "@microsoft/signalr";

const Dashboard = () => {
    const [southOfCanakkaleStrAllShipsCount, setSouthOfCanakkaleStrAllShipsCount] = useState(0)
    const [northOfCanakkaleStrAllShipsCount, setNorthOfCanakkaleStrAllShipsCount] = useState(0)
    const [canakkaleStraitTankersCount, setCanakkaleStraitTankersCount] = useState(0)
    const [canakkaleStraitTransitShipsCount, setCanakkaleStraitTransitShipsCount] = useState(0)
    const [southOfCanakkaleStrAvgSpeed, setSouthOfCanakkaleStrAvgSpeed] = useState(0)
    const [northOfCanakkaleStrAvgSpeed, setNorthOfCanakkaleStrAvgSpeed] = useState(0)
    const [canakkaleStrAvgSpeed, setCanakkaleStrAvgSpeed] = useState(0)
    const [canakkaleStrTankersAvgSpeed, setCanakkaleStrTankersAvgSpeed] = useState(0)

    const [southOfIstanbulStrAllShipsCount, setSouthOfIstanbulStrAllShipsCount] = useState(0)
    const [middleOfIstanbulStrAllShipsCount, setMiddleOfIstanbulStrAllShipsCount] = useState(0)
    const [northOfIstanbulStrAllShipsCount, setNorthOfIstanbulStrAllShipsCount] = useState(0)
    const [istanbulStraitTankersCount, setIstanbulStraitTankersCount] = useState(0)
    const [southOfIstanbulStrAvgSpeed, setSouthOfIstanbulStrAvgSpeed] = useState(0)
    const [middleOfIstanbulStrAvgSpeed, setMiddleOfIstanbulStrAvgSpeed] = useState(0)
    const [northOfIstanbulStrAvgSpeed, setNorthOfIstanbulStrAvgSpeed] = useState(0)
    const [istanbulStraitTransitShipsCount, setIstanbulStraitTransitShipsCount] = useState(0)
    const [istanbulStrAvgSpeed, setIstanbulStrAvgSpeed] = useState(0)
    const [southOfIstanbulStrTankersAvgSpeed, setSouthOfIstanbulStrTankersAvgSpeed] = useState(0)
    const [middleOfIstanbulStrTankersAvgSpeed, setMiddleOfIstanbulStrTankersAvgSpeed] = useState(0)
    const [northOfIstanbulStrTankersAvgSpeed, setNorthOfIstanbulStrTankersAvgSpeed] = useState(0)

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7170/maritimehub")
            .withAutomaticReconnect()
            .build();

        connection.start();

        connection.on("ReceiveDatas", (data) => {
            console.log("📡 Gelen değer:", data);
            setSouthOfCanakkaleStrAllShipsCount(data.southOfCanakkaleStrAllShipsCount);
            setNorthOfCanakkaleStrAllShipsCount(data.northOfCanakkaleStrAllShipsCount);
            setCanakkaleStraitTankersCount(data.canakkaleStraitTankersCount);
            setCanakkaleStraitTransitShipsCount(data.canakkaleStraitTransitShipsCount);
            setSouthOfCanakkaleStrAvgSpeed(data.southOfCanakkaleStrAvgSpeed);
            setNorthOfCanakkaleStrAvgSpeed(data.northOfCanakkaleStrAvgSpeed);
            setCanakkaleStrAvgSpeed(data.canakkaleStrAvgSpeed);
            setCanakkaleStrTankersAvgSpeed(data.canakkaleStrTankersAvgSpeed);

            setSouthOfIstanbulStrAllShipsCount(data.southOfIstanbulStrAllShipsCount);
            setMiddleOfIstanbulStrAllShipsCount(data.middleOfIstanbulStrAllShipsCount);
            setNorthOfIstanbulStrAllShipsCount(data.northOfIstanbulStrAllShipsCount);
            setIstanbulStraitTankersCount(data.istanbulStraitTankersCount);
            setSouthOfIstanbulStrAvgSpeed(data.southOfIstanbulStrAvgSpeed);
            setMiddleOfIstanbulStrAvgSpeed(data.middleOfIstanbulStrAvgSpeed);
            setNorthOfIstanbulStrAvgSpeed(data.northOfIstanbulStrAvgSpeed);
            setIstanbulStraitTransitShipsCount(data.istanbulStraitTransitShipsCount);
            setIstanbulStrAvgSpeed(data.istanbulStrAvgSpeed);
            setSouthOfIstanbulStrTankersAvgSpeed(data.southOfIstanbulStrTankersAvgSpeed);
            setMiddleOfIstanbulStrTankersAvgSpeed(data.middleOfIstanbulStrTankersAvgSpeed);
            setNorthOfIstanbulStrTankersAvgSpeed(data.northOfIstanbulStrTankersAvgSpeed);

        });

        return () => {
            connection.stop();
        };
    }, [])


    return (

        <React.Fragment>
            <div style={{padding: 40}}>
                <div style={{
                    backgroundColor: '#c4e3ff',
                    padding: '20px',
                    borderRadius: '8px',
                    marginBottom: '20px'
                }}>
                    <Row gutter={[16, 16]}>
                        <Col xs={12} sm={6}>
                            <Card>
                                <Statistic
                                    title="Çanakkale Boğazı Güneyi Gemi Sayısı"
                                    value={southOfCanakkaleStrAllShipsCount}
                                    prefix={<RadarChartOutlined style={{color: '#1890ff'}}/>}
                                    valueStyle={{color: '#1890ff'}}
                                />
                            </Card>
                        </Col>

                        <Col xs={12} sm={6}>
                            <Card>
                                <Statistic
                                    title="Çanakkale Boğazı Kuzeyi Gemi Sayısı"
                                    value={northOfCanakkaleStrAllShipsCount}
                                    prefix={<RiseOutlined style={{color: '#52c41a'}}/>}
                                    valueStyle={{color: '#52c41a'}}
                                />
                            </Card>
                        </Col>

                        <Col xs={12} sm={6}>
                            <Card>
                                <Statistic
                                    title="Çanakkale Boğazı Tanker Sayısı"
                                    value={canakkaleStraitTankersCount}
                                    prefix={
                                        canakkaleStraitTankersCount >= 10 ?
                                            <AlertOutlined style={{color: '#f50a0a'}}/>
                                            :
                                            <RocketOutlined style={{color: '#fa8c16'}}/>
                                    }
                                    valueStyle={{color: '#fa8c16'}}
                                />
                            </Card>
                        </Col>

                        <Col xs={12} sm={6}>
                            <Card>
                                <Statistic
                                    title="Çanakkale Boğazı Transit Sayısı"
                                    value={canakkaleStraitTransitShipsCount}
                                    prefix={canakkaleStraitTransitShipsCount >= 10 ?
                                        <AlertOutlined style={{color: '#f50a0a'}}/>
                                        :
                                        <RocketOutlined style={{color: '#722ed1'}}/>}
                                    valueStyle={{color: '#722ed1'}}
                                />
                            </Card>
                        </Col>

                        {/*2.satır*/}
                        <Col xs={12} sm={6}>
                            <Card>
                                <Statistic
                                    title="Çanakkale Boğazı Güneyi Ort. Hız"
                                    value={southOfCanakkaleStrAvgSpeed}
                                    suffix="Kts"
                                    precision={2}
                                    prefix={
                                        southOfCanakkaleStrAvgSpeed >= 10 ?
                                            <AlertOutlined style={{color: '#f50a0a'}}/>
                                            :
                                            <RocketOutlined style={{color: '#fa8c16'}}/>
                                    }
                                    valueStyle={{color: '#1890ff'}}
                                />
                            </Card>
                        </Col>

                        <Col xs={12} sm={6}>
                            <Card>
                                <Statistic
                                    title="Çanakkale Boğazı Kuzeyi Ort. Hız"
                                    value={northOfCanakkaleStrAvgSpeed}
                                    suffix="Kts"
                                    precision={2}
                                    prefix={
                                        northOfCanakkaleStrAvgSpeed >= 10 ?
                                            <AlertOutlined style={{color: '#f50a0a'}}/>
                                            :
                                            <RocketOutlined style={{color: '#fa8c16'}}/>
                                    }
                                    valueStyle={{color: '#52c41a'}}
                                />
                            </Card>
                        </Col>

                        <Col xs={12} sm={6}>
                            <Card>
                                <Statistic
                                    title="Çanakkale Boğazı Anlık Ortalama Hız"
                                    value={canakkaleStrAvgSpeed}
                                    suffix="Kts"
                                    precision={2}
                                    prefix={
                                        canakkaleStrAvgSpeed >= 10 ?
                                            <AlertOutlined style={{color: '#f50a0a'}}/>
                                            :
                                            <RocketOutlined style={{color: '#fa8c16'}}/>
                                    }
                                    valueStyle={{color: '#fa8c16'}}
                                />
                            </Card>
                        </Col>

                        <Col xs={12} sm={6}>
                            <Card>
                                <Statistic
                                    title="Çanakkale Boğazı Anlık Tanker Ortalama Hız"
                                    value={canakkaleStrTankersAvgSpeed}
                                    suffix="knot"
                                    precision={2}
                                    prefix={canakkaleStrTankersAvgSpeed >= 10 ?
                                        <AlertOutlined style={{color: '#f50a0a'}}/>
                                        :
                                        <RocketOutlined style={{color: '#722ed1'}}/>}
                                    valueStyle={{color: '#722ed1'}}
                                />
                            </Card>
                        </Col>
                        {/*3.satır*/}

                    </Row>
                </div>
                <div style={{
                    backgroundColor: '#b1d8fa',
                    padding: '20px',
                    borderRadius: '8px',
                    marginBottom: '20px'
                }}>
                    <Row gutter={[16, 16]}>
                        <Col xs={12} sm={6}>
                            <Card>
                                <Statistic
                                    title="İstanbul Boğazı Güneyi Gemi Sayısı"
                                    value={southOfIstanbulStrAllShipsCount}
                                    prefix={<RiseOutlined style={{color: '#52c41a'}}/>}
                                    valueStyle={{color: '#52c41a'}}
                                />
                            </Card>
                        </Col>

                        <Col xs={12} sm={6}>
                            <Card>
                                <Statistic
                                    title="İstanbul Boğazı Orta Bölge Gemi Sayısı"
                                    value={middleOfIstanbulStrAllShipsCount}
                                    prefix={<RiseOutlined style={{color: '#52c41a'}}/>}
                                    valueStyle={{color: '#fa8c16'}}
                                />
                            </Card>
                        </Col>

                        <Col xs={12} sm={6}>
                            <Card>
                                <Statistic
                                    title="İstanbul Boğazı Kuzeyi Gemi Sayısı"
                                    value={northOfIstanbulStrAllShipsCount}
                                    suffix="knot"
                                    prefix={<RiseOutlined style={{color: '#52c41a'}}/>}
                                    valueStyle={{color: '#722ed1'}}
                                />
                            </Card>
                        </Col>

                        {/*4.satır*/}
                        <Col xs={12} sm={6}>
                            <Card>
                                <Statistic
                                    title="Çanakkale Boğazındaki Tanker Sayısı"
                                    value={istanbulStraitTankersCount}
                                    prefix={<RadarChartOutlined style={{color: '#1890ff'}}/>}
                                    valueStyle={{color: '#1890ff'}}
                                />
                            </Card>
                        </Col>

                        <Col xs={12} sm={6}>
                            <Card>
                                <Statistic
                                    title="İstanbul Boğazı Güneyi Ortalama Hız"
                                    value={southOfIstanbulStrAvgSpeed}
                                    suffix="Kts"
                                    precision={2}
                                    prefix={
                                        southOfIstanbulStrAvgSpeed >= 10 ?
                                            <AlertOutlined style={{color: '#f50a0a'}}/>
                                            :
                                            <RocketOutlined style={{color: '#fa8c16'}}/>
                                    }
                                    valueStyle={{color: '#52c41a'}}
                                />
                            </Card>
                        </Col>

                        <Col xs={12} sm={6}>
                            <Card>
                                <Statistic
                                    title="İstanbul Boğazı Orta Bölge Ortalama Hız"
                                    value={middleOfIstanbulStrAvgSpeed}
                                    precision={2}
                                    suffix="Kts"
                                    prefix={
                                        middleOfIstanbulStrAvgSpeed >= 10 ?
                                            <AlertOutlined style={{color: '#f50a0a'}}/>
                                            :
                                            <RocketOutlined style={{color: '#fa8c16'}}/>
                                    }
                                    valueStyle={{color: '#fa8c16'}}
                                />
                            </Card>
                        </Col>

                        <Col xs={12} sm={6}>
                            <Card>
                                <Statistic
                                    title="İstanbul Boğazı Kuzeyi Ortalama Hız"
                                    value={northOfIstanbulStrAvgSpeed}
                                    precision={2}
                                    suffix="Kts"
                                    prefix={northOfIstanbulStrAvgSpeed >= 10 ?
                                        <AlertOutlined style={{color: '#f50a0a'}}/>
                                        :
                                        <RocketOutlined style={{color: '#722ed1'}}/>}
                                    valueStyle={{color: '#722ed1'}}
                                />
                            </Card>
                        </Col>

                        {/*5.satır*/}
                        <Col xs={12} sm={6}>
                            <Card>
                                <Statistic
                                    title="İstanbul Boğazı Ort. Hız"
                                    value={istanbulStraitTransitShipsCount}
                                    suffix="Kts"
                                    precision={2}
                                    prefix={
                                        istanbulStraitTransitShipsCount >= 10 ?
                                            <AlertOutlined style={{color: '#f50a0a'}}/>
                                            :
                                            <RocketOutlined style={{color: '#fa8c16'}}/>
                                    }
                                    valueStyle={{color: '#1890ff'}}
                                />
                            </Card>
                        </Col>

                        <Col xs={12} sm={6}>
                            <Card>
                                <Statistic
                                    title="İstanbul Boğazı Güney Tanker Ort. Hız"
                                    value={istanbulStrAvgSpeed}
                                    suffix="Kts"
                                    precision={2}
                                    prefix={
                                        istanbulStrAvgSpeed >= 10 ?
                                            <AlertOutlined style={{color: '#f50a0a'}}/>
                                            :
                                            <RocketOutlined style={{color: '#fa8c16'}}/>
                                    }
                                    valueStyle={{color: '#52c41a'}}
                                />
                            </Card>
                        </Col>

                        <Col xs={12} sm={6}>
                            <Card>
                                <Statistic
                                    title="İstanbul Boğazı Anlık Tanker Ort. Hız"
                                    value={southOfIstanbulStrTankersAvgSpeed}
                                    precision={2}
                                    suffix="knot"
                                    prefix={
                                        southOfIstanbulStrTankersAvgSpeed >= 10 ?
                                            <AlertOutlined style={{color: '#f50a0a'}}/>
                                            :
                                            <RocketOutlined style={{color: '#fa8c16'}}/>
                                    }
                                    valueStyle={{color: '#fa8c16'}}
                                />
                            </Card>
                        </Col>

                        <Col xs={12} sm={6}>
                            <Card>
                                <Statistic
                                    title="İstanbul Boğazı Orta Bölge Tanker Ort. Hız"
                                    value={middleOfIstanbulStrTankersAvgSpeed}
                                    precision={2}
                                    suffix="Kts"
                                    prefix={middleOfIstanbulStrTankersAvgSpeed >= 10 ?
                                        <AlertOutlined style={{color: '#f50a0a'}}/>
                                        :
                                        <RocketOutlined style={{color: '#722ed1'}}/>}
                                    valueStyle={{color: '#722ed1'}}
                                />
                            </Card>
                        </Col>

                        <Col xs={12} sm={6}>
                            <Card>
                                <Statistic
                                    title="İstanbul Boğazı Kuzeyi Tanker Ort. Hız"
                                    value={northOfIstanbulStrTankersAvgSpeed}
                                    suffix="Kts"
                                    precision={2}
                                    prefix={
                                        northOfIstanbulStrTankersAvgSpeed >= 10 ?
                                            <AlertOutlined style={{color: '#f50a0a'}}/>
                                            :
                                            <RocketOutlined style={{color: '#fa8c16'}}/>
                                    }
                                    valueStyle={{color: '#1890ff'}}
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>

        </React.Fragment>
    )

}

export default Dashboard;