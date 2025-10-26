import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Ships from "./pages/ships";
import Dashboard from "./pages/dashboard";
import Layout from "./components/layout/Layout";
import Login from "./pages/user/login"
import Notfound from "./pages/notfound"
import GeneralAnalyze from "./pages/generalanalyze";
import NavtexAnalyze from "./pages/navtexanalyze";

function App() {
    return (
        <div className="App">
            <div className="app-wrapper">
                <div className="app-content">
                    <Router>

                        {/*{localStorage.getItem("token") ?*/}
                        {/*    (*/}
                        <Routes>
                                <Route path="/" element={<Login/>}/>
                                <Route path="/dashboard" element={<Layout><Dashboard/></Layout>}/>
                                <Route path="/ships" element={<Layout><Ships/></Layout>}/>
                                <Route path="/generalanalyze" element={<Layout><GeneralAnalyze/></Layout>}/>
                                <Route path="/navtexanalyze" element={<Layout><NavtexAnalyze/></Layout>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/logout" element={<Login/>}/>
                                {/*<Route path="*" element={<Notfound/>}/>*/}
                            </Routes>
                        {/*)*/}
                        {/*    :*/}
                        {/*    (*/}
                        <Routes>
                                <Route path="/" element={<Login/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/logout" element={<Login/>}/>
                                {/*<Route path="*" element={<Notfound/>}/>*/}
                            </Routes>
                        {/*)*/}

                    </Router>

                </div>
            </div>
        </div>
    );
}

export default App;
