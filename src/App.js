import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Ships from "./pages/ships";
import Dashboard from "./pages/dashboard";
import Layout from "./components/layout/Layout";
import Login from "./pages/user/login"

function App() {
    return (
        <div className="App">
            <div className="app-wrapper">
                <div className="app-content">
                    <Router>
                        <Routes>
                            <Route path="/" element={<Layout><Dashboard/></Layout>}/>
                            <Route path="/dashboard" element={<Layout><Dashboard/></Layout>}/>
                            <Route path="/ships" element={<Layout><Ships/></Layout>}/>
                            <Route path="/login" element={<Login/>}/>
                        </Routes>

                    </Router>

                </div>
            </div>
        </div>
    );
}

export default App;
