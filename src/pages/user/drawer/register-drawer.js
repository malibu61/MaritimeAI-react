import React from "react"
import {Button, Drawer, Form, Input, message} from "antd";
import {registerService} from "../../../services/register"
import {loginService} from "../../../services/login"
import {useNavigate} from "react-router-dom"


const RegisterDrawer = (props) => {

    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const {isRegisterDrawerOpen, setIsRegisterDrawerOpen} = props;

    const register = (data) => {
        registerService(data).then((response) => {

                if (response.message === "Kayıt Başarılı. Giriş Yapılıyor!") {

                    messageApi.success({
                        content: (
                            <>
                                <div style={{width: 300}}>Kayıt Başarılı!</div>
                                <div style={{width: 300}}>Giriş Yapılıyor...</div>
                                <div style={{width: 300}}> Hoşgeldin {response.name} {response.lastname}</div>
                            </>
                        ),
                        duration: 3
                    })

                    setTimeout(() => {
                        loginService({
                            username: data.username,
                            password: data.password
                        }).then((loginResponse) => {
                            if (loginResponse.message === "Giriş Başarılı") {

                                localStorage.setItem('token', loginResponse.token);
                                localStorage.setItem('user', JSON.stringify({
                                    username: loginResponse.username,
                                    name: loginResponse.name,
                                    lastname: loginResponse.lastname
                                }));

                                setIsRegisterDrawerOpen(false);
                                // navigate("/dashboard")
                                window.location.href ="/dashboard"
                            }
                        });
                    }, 1000)
                } else {
                    messageApi.error({
                        content: (
                            <>
                                <div>Kayıt Başarısız. Lütfen Formu Eksiksiz Doldurun.</div>
                            </>
                        ),
                        duration: 3
                    })
                }

            }
        )

    }

    return (
        <>{contextHolder}
            <Drawer open={isRegisterDrawerOpen} onClose={() => setIsRegisterDrawerOpen(false)}>
                <Form onFinish={(values) => {
                    register({
                        username: values.username,
                        password: values.password,
                        name: values.name,
                        lastname: values.lastname,
                        phone: values.phone,
                        email: values.email,

                    });
                }}>
                    <div>
                        <p>Ad</p>
                        <Form.Item name="name">
                            <Input type="text" style={{width: 300}}/>
                        </Form.Item>
                    </div>
                    <div>
                        <p>Soyad</p>
                        <Form.Item name="lastname">
                            <Input type="text" style={{width: 300}}/>
                        </Form.Item>
                    </div>
                    <div>
                        <p>E Mail</p>
                        <Form.Item name="email">
                            <Input type="text" style={{width: 300}}/>
                        </Form.Item>
                    </div>
                    <div>
                        <p>Telefon</p>
                        <Form.Item name="phone">
                            <Input type="text" sjjtyle={{width: 300}}/>
                        </Form.Item>
                    </div>
                    <div>
                        <p>Kullanıcı Adı</p>
                        <Form.Item name="username">
                            <Input type="username" style={{width: 300}}/>
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
                            Kaydol
                        </Button>
                    </div>
                </Form>
            </Drawer>
        </>
    )

}

export default RegisterDrawer;