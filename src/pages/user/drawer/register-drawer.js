import React from "react"
import {Button, Drawer, Form, Input} from "antd";

const RegisterDrawer = (props) => {

    const {isRegisterDrawerOpen, setIsRegisterDrawerOpen} = props;

    return (
        <Drawer open={isRegisterDrawerOpen} onClose={() => setIsRegisterDrawerOpen(false)}>
            <Form>
                <div>
                    <p>Kullanıcı Adı</p>
                    <Form.Item>
                        <Input type="text" style={{width: 300}}/>
                    </Form.Item>
                </div>
                <div>
                    <p>Parola</p>
                    <Form.Item>
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
    )

}

export default RegisterDrawer;