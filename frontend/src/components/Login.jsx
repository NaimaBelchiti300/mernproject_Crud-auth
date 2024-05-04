import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './footer';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { email, password } = formData;
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const body = JSON.stringify({ email, password });
          const loginResponse = await axios.post(
            `http://localhost:4000/api/users/login`,
            body,
            config
          );
          console.log("Token:", loginResponse.data.token);
          localStorage.setItem("token", loginResponse.data.token);
          const authConfig = {
            headers: {
              Authorization: `Bearer ${loginResponse.data.token}`,
            },
          };
          const meResponse = await axios.get(
            `http://localhost:4000/api/users/me`,
            authConfig
          );
          console.log("User Data:", meResponse.data);
   
          setError(null);
          navigate("/goals"); 
        } catch (err) {
          console.error(err.response.data);
        
          setError("Invalid email or password. Please try again.");
        }
      };

    return (
       <div className="register-container" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#f9f9f9', maxWidth: '400px', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
  <form onSubmit={onSubmit}>
    <p style={{ textAlign: 'center', marginTop: '10px' }}>Se Connecter</p>
    <input type="email" name="email" className="form-control" value={email} onChange={onChange} placeholder="Email"style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}  required />
    <input className="form-control" type="password" name="password" value={password} onChange={onChange} placeholder="Mot de passe" style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }} required />
    <button type="submit" style={{ padding: '8px 16px', borderRadius: '5px', background: 'purple', color: 'white', border: 'none', cursor: 'pointer' }}>Se connecter</button>
  </form>
  {error && <div className="error"  style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
  <p style={{ textAlign: 'center', marginTop: '10px' }}>Vous avez déjà un compte? <Link to="/register">Inscrivez-vous</Link></p>
</div>


      
    );
};

export default Login;
