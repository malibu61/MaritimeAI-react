import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Ships from "./pages/ships";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <div className="App">

        <Router>
           <Routes>
               <Route path="/" element={<Dashboard/>}/>
               <Route path="/dashboard" element={<Dashboard/>}/>
               <Route path="/ships" element={<Ships/>}/>
           </Routes>
        </Router>

    </div>
  );
}

export default App;
