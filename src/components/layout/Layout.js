import {Layout as AntLayout, Menu, Typography, Button} from "antd"
import {
    DashboardOutlined,
    ShopOutlined,
    LeftOutlined,
    RightOutlined
} from "@ant-design/icons"
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const {Title} = Typography;

const {Header, Content, Footer, Sider} = AntLayout


const Layout = ({children}) => {

    const location = useLocation()
    const navigate = useNavigate()

    const [collapseSider, setCollapseSider] = useState(false)

    const [showTitle, setShowTitle] = useState(false);

    useEffect(() => {
        if (!collapseSider) {
            const timer = setTimeout(() => {
                setShowTitle(true);
            }, 100); // 1 saniye gecikme

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
            icon: <ShopOutlined/>,
            label: "Gemiler"
        }
    ]

    return (
        <AntLayout>
            <Sider
                defaultCollapsed={false}
                breakpoint="lg"
                collapsed={collapseSider}       //state ekleyeceğiz
                style={{height:"100vh"}}
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
                        navigate(key)
                    }}
                />

            </Sider>

            <AntLayout>
                <Header
                    style={{
                        padding: '0 24px',
                        background: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        borderBottom: '1px solid #f0f0f0'
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

                    {/*<h1>Maritime AI Analiz Uygulaması</h1>*/}
                    <Title level={4} style={{margin: '0 0 0 16px', color: '#1890ff'}}>
                        Türkiye Çevresi Deniz Trafiği
                    </Title>
                </Header>

                <Content>
                    {children}
                </Content>
            </AntLayout>

        </AntLayout>)
}

export default Layout