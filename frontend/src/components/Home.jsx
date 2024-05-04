import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './footer';

function HomePage() {
  return (
    <div className="home-page">
      <div className="container" style={{margin:'100px',textAlign:'center'}}>
        <h1 style={{fontWeight:'bold',color:'purple'}}>Welcome to our Goal Management Application</h1>
        <p style={{fontWeight:'bold',color:'black',fontFamily:'arial',margin:'40px'}}>Our application helps you manage your goals efficiently. You can create, update, and delete goals as needed.</p>
        <div className="buttons" style={{margin:'50px'}}>
          <Link to="/login" className="btn btn-success m-2 " style={{'width':'150px'}}>Login</Link>
          <Link to="/register" className="btn btn-info text-white"style={{'width':'150px'}}>Register</Link>
        </div>
      </div>

     <Footer/>
     
 
    </div>
  );
}

export default HomePage;
