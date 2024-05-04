
import { Link } from "react-router-dom"
export default function Footer(){
    return(
     





        <footer className="h" style={{backgroundColor:'purple',fontWeight:'bold'}}>
      <div style={{textAlign:'center'}}>
        <Link className="navbar-brand" to="/" style={{color:'white'}}>Copyright &copy; {new Date().getFullYear()} Goal Management App</Link>
        
       
       
    <div style={{display:'flex' ,alignContent:'center' ,justifyContent:'center'}}>
              <Link className="nav-link" to="/login"style={{color:'white',marginRight:'12px'}}>Login</Link>
              <Link className="nav-link" to="/register"style={{color:'white'}}>Register</Link></div>
           
   
    
      </div>
    </footer>

        
      







      
    )
}