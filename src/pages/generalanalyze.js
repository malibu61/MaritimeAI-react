import React, {useEffect, useState} from "react"
import {Card, Col, Row} from "antd";
import ReactMarkdown from 'react-markdown';
import MaritimeLogo from "../../src/logo/maritime-ai-small-icon-logo.svg"
import {getIstanbulStraitAiAnalyzeService, getCanakkaleStraitAiAnalyzeService} from "../services/ai"

const GeneralAnalyze = () => {

    const [istanbulStraitAiAnalyze, setIstanbulStraitAiAnalyze] = useState("")
    const [canakkaleStraitAiAnalyze, setCanakkaleStraitAiAnalyze] = useState("")
    const [istanbulLoading, setIstanbulLoading] = useState(true)
    const [canakkaleLoading, setCanakkaleLoading] = useState(true)

    useEffect(() => {
        getIstanbulStraitAiAnalyzeService()
            .then((res) => {
                setIstanbulStraitAiAnalyze(res.analysis);
                console.log(res)
            })
            .catch((error) => {
                setIstanbulStraitAiAnalyze("Analiz yüklenirken hata oluştu.: " + error);
            })
            .finally(() => {
                setIstanbulLoading(false);
            });

        getCanakkaleStraitAiAnalyzeService()
            .then((res) => {
                setCanakkaleStraitAiAnalyze(res.analysis);
                console.log(res)
            })
            .catch((error) => {
                setCanakkaleStraitAiAnalyze("Analiz yüklenirken hata oluştu.: " + error);
            })
            .finally(() => {
                setCanakkaleLoading(false);
            });
    }, [])

    const IconSpinner = () => (
        <div style={{
            animation: 'spin 5s linear infinite',
            display: 'inline-block'
        }}>
            <img src={MaritimeLogo} alt="MaritimeAI" style={{width: '100px'}}/>
        </div>
    );

    return (

        <React.Fragment>
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                .markdown-content h2 {
                    color: #1890ff;
                    font-size: 16px;
                    margin-top: 20px;
                    margin-bottom: 10px;
                    font-weight: 600;
                }
                
                .markdown-content ul {
                    line-height: 1.8;
                }
                
                .markdown-content li {
                    margin-bottom: 8px;
                }
                
                .markdown-content strong {
                    color: #262626;
                }
            `}</style>

            <div style={{padding: 40}}>
                <Row gutter={24}>
                    <Col md={12}>
                        <Card>
                            <div style={{
                                fontSize: 22,
                                fontWeight: 'bold',
                                color: '#1890ff',
                                marginBottom: 20,
                                paddingBottom: 15,
                                borderBottom: '3px solid #1890ff'
                            }}>Çanakkale Boğazı AI Analiz
                            </div>
                            {canakkaleLoading ? (<div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minHeight: 300,
                                gap: 16
                            }}>
                                <IconSpinner/>
                                <div style={{color: '#1890ff', fontSize: 16}}>
                                    Çanakkale Genel AI Analiz yükleniyor...
                                </div>
                            </div>) : (<div className="markdown-content" style={{textAlign: 'left'}}>
                                <ReactMarkdown>{canakkaleStraitAiAnalyze}</ReactMarkdown>
                            </div>)}
                        </Card>
                    </Col>
                    <Col md={12}>
                        <Card>
                            <div style={{
                                fontSize: 22,
                                fontWeight: 'bold',
                                color: '#1890ff',
                                marginBottom: 20,
                                paddingBottom: 15,
                                borderBottom: '3px solid #1890ff'
                            }}>İstanbul Boğazı AI Analiz
                            </div>
                            {istanbulLoading ? (<div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minHeight: 300,
                                gap: 16
                            }}>
                                <IconSpinner/>
                                <div style={{color: '#1890ff', fontSize: 16}}>
                                    İstanbul Genel AI Analiz yükleniyor...
                                </div>
                            </div>) : (<div className="markdown-content" style={{textAlign: 'left'}}>
                                <ReactMarkdown>{istanbulStraitAiAnalyze}</ReactMarkdown>
                            </div>)}
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    )

}

export default GeneralAnalyze;