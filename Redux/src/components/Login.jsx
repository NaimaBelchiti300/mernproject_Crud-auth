import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Form, Button, Card, Alert, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../features/authSlice';
import NavBar from './NavBar';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = { email, password };
      const resultAction = await dispatch(loginUser(loginData));
  
      if (loginUser.fulfilled.match(resultAction)) {
        setError(null);
        navigate('/goals'); 
      } else if (loginUser.rejected.match(resultAction)) {
        setError(resultAction.payload.message || 'An error occurred while logging in. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while logging in. Please try again.');
    }
  };
  
  
  
  

  return (
    <>
    <NavBar/>
  

    <div className="register-container" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#f9f9f9', maxWidth: '400px', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
  <form onSubmit={onSubmit}>
    <p style={{ textAlign: 'center', marginTop: '10px' }}>Se Connecter</p>
    <input  type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onChange}
                required
                style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}   />
    <input className="form-control"  type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
                required
                 style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}  />
    <button type="submit" style={{ padding: '8px 16px', borderRadius: '5px', background: 'purple', color: 'white', border: 'none', cursor: 'pointer' }}>Se connecter</button>
  </form>
  {error && <div className="error"  style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
  <p style={{ textAlign: 'center', marginTop: '10px' }}>Vous avez déjà un compte? <Link to="/register">Inscrivez-vous</Link></p>
</div>
    </>

  );
};

export default Login;
