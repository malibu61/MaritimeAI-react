import React, {useEffect, useState} from "react"
import {Card, Col, Row} from "antd";
import ReactMarkdown from 'react-markdown';
import MaritimeLogo from "../../src/logo/maritime-ai-small-icon-logo.svg"

import {
    getIstanbulStraitNavtexAiAnalyzeService,
    getCanakkaleStraitNavtexAiAnalyzeService
} from "../services/ai"

const GeneralAnalyze = () => {

    const [istanbulStraitNavtexAiAnalyze, setIstanbulStraitNavtexAiAnalyze] = useState("")
    const [canakkaleStraitNavtexAiAnalyze, setCanakkaleStraitNavtexAiAnalyze] = useState("")

    const [istanbulLoading, setIstanbulLoading] = useState(true)
    const [canakkaleLoading, setCanakkaleLoading] = useState(true)

    useEffect(() => {
        // İstanbul
        getIstanbulStraitNavtexAiAnalyzeService()
            .then((res) => {
                setIstanbulStraitNavtexAiAnalyze(res.analysis);
            })
            .catch((error) => {
                setIstanbulStraitNavtexAiAnalyze("Analiz yüklenirken hata oluştu.: "+error);
            })
            .finally(() => {
                setIstanbulLoading(false);
            });

        // Çanakkale
        getCanakkaleStraitNavtexAiAnalyzeService()
            .then((res) => {
                setCanakkaleStraitNavtexAiAnalyze(res.analysis);
            })
            .catch((error) => {
                setCanakkaleStraitNavtexAiAnalyze("Analiz yüklenirken hata oluştu.: "+error);
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

            <div style={{
                padding: '30px 40px',
                backgroundColor: '#f0f2f5',
                minHeight: '100vh'
            }}>
                <Row gutter={24}>
                    <Col xs={24} lg={12}>
                        <Card
                            style={{
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                borderRadius: 12,
                                height: '100%'
                            }}
                            bodyStyle={{padding: 30}}
                        >
                            <div style={{
                                fontSize: 22,
                                fontWeight: 'bold',
                                color: '#1890ff',
                                marginBottom: 20,
                                paddingBottom: 15,
                                borderBottom: '3px solid #1890ff'
                            }}>
                                Çanakkale Boğazı NAVTEX AI Analiz
                            </div>

                            {canakkaleLoading ? (
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    minHeight: 300,
                                    gap: 16
                                }}>
                                    <IconSpinner />
                                    <div style={{color: '#1890ff', fontSize: 16}}>
                                        Çanakkale Boğazı NAVTEX AI Analizi yükleniyor...
                                    </div>
                                </div>
                            ) : (
                                <div className="markdown-content" style={{textAlign: 'left'}}>
                                    <ReactMarkdown>{canakkaleStraitNavtexAiAnalyze}</ReactMarkdown>
                                </div>
                            )}
                        </Card>
                    </Col>

                    <Col xs={24} lg={12}>
                        <Card
                            style={{
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                borderRadius: 12,
                                height: '100%'
                            }}
                            bodyStyle={{padding: 30}}
                        >
                            <div style={{
                                fontSize: 22,
                                fontWeight: 'bold',
                                color: '#1890ff',
                                marginBottom: 20,
                                paddingBottom: 15,
                                borderBottom: '3px solid #1890ff'
                            }}>
                                İstanbul Boğazı NAVTEX AI Analiz
                            </div>

                            {istanbulLoading ? (
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    minHeight: 300,
                                    gap: 16
                                }}>
                                    <IconSpinner />
                                    <div style={{color: '#1890ff', fontSize: 16}}>
                                        İstanbul Boğazı NAVTEX AI Analizi yükleniyor...
                                    </div>
                                </div>
                            ) : (
                                <div className="markdown-content" style={{textAlign: 'left'}}>
                                    <ReactMarkdown>{istanbulStraitNavtexAiAnalyze}</ReactMarkdown>
                                </div>
                            )}
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    )
}

export default GeneralAnalyze;