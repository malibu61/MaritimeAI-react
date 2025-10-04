import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Ships from "./pages/ships";
import Dashboard from "./pages/dashboard";
import Layout from "./components/layout/Layout";

function App() {
    return (
        <div className="App">
            <div className="app-wrapper">
                <div className="app-content">
                    <Router>
                        <Layout>
                            <Routes>
                                <Route path="/" element={<Dashboard/>}/>
                                <Route path="/dashboard" element={<Dashboard/>}/>
                                <Route path="/ships" element={<Ships/>}/>
                            </Routes>
                        </Layout>
                    </Router>

                </div>
            </div>
        </div>
    );
}

export default App;
