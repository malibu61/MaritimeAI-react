import React, {useEffect, useState} from "react"
import {Card, Col, Row, Statistic} from "antd";
import {
    AlertOutlined,
    ClockCircleOutlined,
    RadarChartOutlined,
    RiseOutlined,
    RocketOutlined,
} from "@ant-design/icons";
import {
    canakkaleStraitShipsCountService,
    istanbulStraitShipsCountService,
    canakkaleStraitShipsAvgSpeedService,
    istanbulStraitShipsAvgSpeedService
} from "../services/ships";

const Dashboard = () => {

    const [canakkaleStraitShipsCount, setCanakkaleStraitShipsCount] = useState(0)
    const [istanbulStraitShipsCount, setIstanbulStraitShipsCount] = useState(0)
    const [canakkaleStraitShipsAvgSpeed, setCanakkaleStraitShipsAvgSpeed] = useState(0)
    const [istanbulStraitShipsAvgSpeed, setIstanbulStraitShipsAvgSpeed] = useState(0)

    useEffect(() => {
        canakkaleStraitShipsCountService().then((res) => setCanakkaleStraitShipsCount(res))
        istanbulStraitShipsCountService().then((res) => setIstanbulStraitShipsCount(res))
        canakkaleStraitShipsAvgSpeedService().then((res) => setCanakkaleStraitShipsAvgSpeed(res))
        istanbulStraitShipsAvgSpeedService().then((res) => setIstanbulStraitShipsAvgSpeed(res))
    })

    return (

        <React.Fragment>
            <div style={{padding: 40}}>
                <Row gutter={[16, 16]}>
                    <Col xs={12} sm={6}>
                        <Card>
                            <Statistic
                                title="Çanakkale Boğazındaki Gemi Sayısı"
                                value={canakkaleStraitShipsCount}
                                prefix={<RadarChartOutlined style={{color: '#1890ff'}}/>}
                                valueStyle={{color: '#1890ff'}}
                            />
                        </Card>
                    </Col>

                    <Col xs={12} sm={6}>
                        <Card>
                            <Statistic
                                title="İstanbul Boğazındaki Gemi Sayısı"
                                value={istanbulStraitShipsCount}
                                // suffix={`/ 29`}
                                prefix={<RiseOutlined style={{color: '#52c41a'}}/>}
                                // precision={2}
                                valueStyle={{color: '#52c41a'}}
                            />
                        </Card>
                    </Col>

                    <Col xs={12} sm={6}>
                        <Card>
                            <Statistic
                                title="Çanakkale Boğazı Anlık Ortalama Hız"
                                value={canakkaleStraitShipsAvgSpeed}
                                precision={2}
                                suffix="knot"
                                prefix={
                                    canakkaleStraitShipsAvgSpeed >= 10 ?
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
                                title="İstanbul Boğazı Anlık Ortalama Hız"
                                value={istanbulStraitShipsAvgSpeed}
                                precision={2}
                                suffix="knot"
                                prefix={istanbulStraitShipsAvgSpeed >= 10 ?
                                    <AlertOutlined style={{color: '#f50a0a'}}/>
                                    :
                                    <RocketOutlined style={{color: '#722ed1'}}/>}
                                valueStyle={{color: '#722ed1'}}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    )

}

export default Dashboard;