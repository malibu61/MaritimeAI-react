import {Button, Layout as AntLayout, Menu, message, Typography} from "antd"
import {
    DashboardOutlined,
    FundOutlined,
    LeftOutlined,
    LogoutOutlined,
    RadarChartOutlined,
    RightOutlined,
    RocketOutlined
} from "@ant-design/icons"

import {logoutService} from "../../services/login"

import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";

const {Title} = Typography;

const {Header, Content, Footer, Sider} = AntLayout


const Layout = ({children}) => {

    const [messageApi, contextHolder] = message.useMessage();

    const location = useLocation()
    const navigate = useNavigate()

    const [collapseSider, setCollapseSider] = useState(false)

    const [showTitle, setShowTitle] = useState(false);

    const handleLogout = () => {
        logoutService().then((response) => {
            if (response.message === "Başarıyla Çıkış Yapıldı") {
                localStorage.removeItem("token")
                localStorage.removeItem("user")

                messageApi.info(({
                    content: (
                        <>
                            <div style={{width: 300}}>Başarıyla Çıkış Yapıldı!</div>
                        </>
                    ),
                    duration: 3,
                }))

                setTimeout(() => {
                    // navigate("/login")
                    window.location.href = "/login";
                }, 2000)


            } else {
                messageApi.error({
                    content: (
                        <>
                            <div style={{width: 300}}>Çıkış İşlemi Başarısız.</div>
                        </>
                    ),
                    duration: 3
                })
            }
        })
    }


    useEffect(() => {
        if (!collapseSider) {
            const timer = setTimeout(() => {
                setShowTitle(true);
            }, 100);

            return () => clearTimeout(timer);
        } else {
            setShowTitle(false);
        }
    }, [collapseSider]);

    const menuItems = [
        {
            key: "/dashboard",
            icon: <DashboardOutlined/>,
            label: "Dashboard"
        },
        {
            key: "/ships",
            icon: <RocketOutlined/>,
            label: "Gemiler"
        },
        {
            key: "/generalanalyze",
            icon: <FundOutlined/>,
            label: "Genel AI Analiz"
        },
        {
            key: "/navtexanalyze",
            icon: <RadarChartOutlined/>,
            label: "NAVTEX AI Analiz"
        },
        {
            key: "/logout",
            icon: <LogoutOutlined/>,
            label: "Çıkış Yap"
        }
    ]
    return (
        <>
            {contextHolder}

            <AntLayout style={{minHeight: '100vh'}}>
                <Sider
                    collapsed={collapseSider}
                    trigger={null}
                    style={{height: "100vh", position: "fixed", overflow: "auto"}}
                >
                    <div style={{height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

                        {collapseSider &&
                            <Title level={2} style={{
                                color: 'white'
                            }}>
                                AI
                            </Title>}

                        {showTitle && !collapseSider && (
                            <Title level={2} style={{color: 'white'}}>
                                Maritime AI
                            </Title>
                        )}
                    </div>

                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[location.pathname]}
                        items={menuItems}
                        onClick={({key}) => {

                            if (key == "/logout") {
                                handleLogout()
                            } else {
                                navigate(key)
                            }
                        }
                        }
                    />

                </Sider>

                <AntLayout style={{
                    marginLeft: collapseSider ? 80 : 200,
                    minHeight: '100vh'
                }}>>
                    <Header
                        style={{
                            padding: '0 24px',
                            marginTop: -20,
                            background: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            borderBottom: '1px solid #f0f0f0',
                            position: 'sticky',
                            top: 0,
                            zIndex: 1
                        }}
                    >
                        <Button
                            type="primary"
                            shape="circle"
                            icon={collapseSider ? <RightOutlined/> : <LeftOutlined/>}
                            onClick={() => {
                                setCollapseSider(!collapseSider)
                            }}

                            style={{
                                fontSize: '18px',
                                width: 30,
                                height: 30,
                            }}

                            ghost
                        />

                        <Title level={4} style={{margin: '0 0 0 16px', color: '#1890ff'}}>
                            Türkiye Çevresi Deniz Trafiği Analizi
                        </Title>
                    </Header>

                    <Content>
                        {children}
                    </Content>
                </AntLayout>

            </AntLayout>
        </>)
}

export default Layout