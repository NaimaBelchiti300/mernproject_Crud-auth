import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{backgroundColor:'purple',fontWeight:'bold'}}>
    <div className="container-fluid" >
      <Link className="navbar-brand" to="/" style={{color:'white',textDecoration:"none"}}>GOALS APPLICATION</Link>
      
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
         
            <Link className="nav-link" to="/"style={{color:'white',marginRight:'30px'}}>Login</Link>
        
            <Link className="nav-link" to="/register"style={{color:'white',marginRight:'30px'}}>Register</Link>
            <Link className="nav-link" to="/goals"style={{color:'white'}}>Goals</Link>
         
     <button   className='btn' onClick={handleSignOut} style={{marginLeft:'50px',backgroundColor:'pink',color:'white'}}>
            Sign Out
          </button>

     
        
    
    
        </ul>
      </div>
    </div>
  </nav>
    
  );
};

export default NavBar;
