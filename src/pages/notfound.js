// pages/NotFound.js
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: '#f0f2f5'
        }}>
            <Result
                status="404"
                title="404"
                subTitle="Üzgünüz, aradığınız sayfa bulunamadı."
                extra={[
                    <Button
                        type="primary"
                        icon={<HomeOutlined />}
                        onClick={() => navigate('/dashboard')}
                        key="dashboard"
                    >
                        Ana Sayfaya Dön
                    </Button>,
                    <Button
                        onClick={() => navigate(-1)}
                        key="back"
                    >
                        Geri Dön
                    </Button>
                ]}
            />
        </div>
    );
};

export default NotFound;