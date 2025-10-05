import React from "react"
import {Button, Drawer, Row, Col, Divider, Typography, Form, Input} from "antd"
import MaritimeLogo from "../../logo/maritime-ai-logo.svg"
import {LoginOutlined, UserAddOutlined} from "@ant-design/icons";
import LoginDrawer from "./drawer/login-drawer";
import RegisterDrawer from "./drawer/register-drawer";

const {Text} = Typography

const LoginComponent = () => {

    const [isLoginDrawerOpen, setIsLoginDrawerOpen] = React.useState(false);
    const [isRegisterDrawerOpen, setIsRegisterDrawerOpen] = React.useState(false);

    return (
        <React.Fragment>

            <Row gutter={24}>
                <Col span={12}>
                    <img src={MaritimeLogo} alt="MaritimeAI"/>
                </Col>
                <Col span={12}>
                    <Row style={{marginTop: 300, justifyContent: "center", alignItems: "center"}}>
                        <Col span={6}>

                            <Text type="secondary" style={{fontSize: '20px'}}>
                                Üyeliğin Var Mı?
                            </Text>
                        </Col>
                        <Col span={8}>

                            <Button
                                type="primary"
                                size="large"
                                block
                                icon={<LoginOutlined/>}
                                style={{
                                    marginTop: '12px',
                                    height: '50px',
                                    fontSize: '16px',
                                    backgroundColor: '#6D94C5',
                                    borderColor: '#6D94C5',
                                    color: 'white'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "#CBDCEB"
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "#6D94C5"
                                }}

                                onClick={() => {
                                    setIsLoginDrawerOpen(true)
                                }}

                            >Giriş Yap</Button>
                        </Col>
                    </Row>

                    <Divider style={{margin: '8px 0'}}>
                        <Text type="secondary" style={{fontSize: '15px'}}>
                            <i>veya</i>
                        </Text>
                    </Divider>

                    <Row style={{marginBottom: 250, marginTop: 25, justifyContent: "center", alignItems: "center"}}>
                        <Col span={6}>
                            <Text type="secondary" style={{fontSize: '20px'}}>
                                Hesabın Yok Mu?
                            </Text>
                        </Col>
                        <Col span={8}>

                            <Button
                                type="default"
                                size="large"
                                block
                                icon={<UserAddOutlined/>}
                                style={{
                                    marginTop: '12px',
                                    height: '50px',
                                    fontSize: '16px',
                                    backgroundColor: '#17313E',
                                    borderColor: '#17313E',
                                    color: 'white'

                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "#CBDCEB"
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "#17313E"
                                }}

                                onClick={()=>{setIsRegisterDrawerOpen(true)}}

                            >Kayıt Ol!</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>


            <LoginDrawer isLoginDrawerOpen={isLoginDrawerOpen} setIsLoginDrawerOpen={setIsLoginDrawerOpen}/>
            <RegisterDrawer isRegisterDrawerOpen={isRegisterDrawerOpen} setIsRegisterDrawerOpen={setIsRegisterDrawerOpen}/>


        </React.Fragment>
    )

}

export default LoginComponent