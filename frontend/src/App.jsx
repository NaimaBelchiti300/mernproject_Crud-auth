import { BrowserRouter as Router,Link, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

import GoalsComponent from "./components/Goals";
import ProtectedRoute from "./components/goalservices";
import HomePage from "./components/Home";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg" style={{backgroundColor:'purple',fontWeight:'bold'}}>
      <div className="container-fluid" >
        <Link className="navbar-brand" to="/" style={{color:'white'}}>GOALS APPLICATION</Link>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/login"style={{color:'white'}}>Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register"style={{color:'white'}}>Register</Link>
            </li>
           
          </ul>
        </div>
      </div>
    </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       
        <Route
          path="/goals"
          element={
            <ProtectedRoute>
              <GoalsComponent />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
export default App;
