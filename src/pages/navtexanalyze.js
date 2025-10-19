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
            `}</style>

            <div style={{padding: 40}}>
                <Row gutter={24}>
                    <Col md={12}>
                        <Card>
                            <h1>Çanakkale Boğazı NAVTEX AI Analiz</h1>
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
                                <div style={{textAlign: 'left'}}>
                                    <ReactMarkdown>{canakkaleStraitNavtexAiAnalyze}</ReactMarkdown>
                                </div>
                            )}
                        </Card>
                    </Col>

                    <Col md={12}>
                        <Card>
                            <h1>İstanbul Boğazı NAVTEX AI Analiz</h1>
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
                                <div style={{textAlign: 'left'}}>
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