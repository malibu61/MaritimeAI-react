import React from "react"
import {Button, Drawer, Form, Input, message, Space} from "antd";
import {loginService} from "../../../services/login";
import {useNavigate} from "react-router-dom"

const LoginDrawer = (props) => {

    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const {isLoginDrawerOpen, setIsLoginDrawerOpen} = props;

    const login = (data) => {
        loginService(data).then((response) => {

                if (response.message === "Giriş Başarılı") {

                    localStorage.setItem('token', response.token);
                    localStorage.setItem('user', JSON.stringify({
                        username: response.username,
                        name: response.name,
                        lastname: response.lastname
                    }));

                    messageApi.success({
                        content: (
                            <>
                                <div style={{width: 300}}>Giriş Başarılı!</div>
                                <div style={{width: 300}}> Hoşgeldin {response.name} {response.lastname}</div>
                            </>
                        ),
                        duration: 3
                    })


                    setTimeout(() => {
                        setIsLoginDrawerOpen(false);
                        navigate("/dashboard")
                    }, 2000)

                } else {
                    messageApi.error({
                        content: (
                            <>
                                <div style={{width: 300}}>Giriş Başarısız. Lütfen Bilgilerinizi Kontrol Edin.</div>
                            </>
                        ),
                        duration: 3
                    })
                }

            }
        )

    }

    return (
        <>
            {contextHolder}
            <Drawer open={isLoginDrawerOpen} onClose={() => setIsLoginDrawerOpen(false)}>
                <Form
                    onFinish={(values) => {
                        login({
                            username: values.username,
                            password: values.password,
                        });
                    }}>
                    <div>
                        <p>Kullanıcı Adı</p>
                        <Form.Item name="username">
                            <Input type="text" sjjtyle={{width: 300}}/>
                        </Form.Item>
                    </div>
                    <div>
                        <p>Parola</p>
                        <Form.Item name="password">
                            <Input type="password" style={{width: 300}}/>
                        </Form.Item>
                    </div>
                    <div>
                        <Button
                            color="#32394E"
                            htmlType="submit"
                            variant="solid"
                            style={{width: 300, backgroundColor: '#6D94C5'}}
                            block
                        >
                            Giriş Yap
                        </Button>
                    </div>
                </Form>
            </Drawer>
        </>
    )

}

export default LoginDrawer;