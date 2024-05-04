// Register.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, selectLoading } from '../features/authSlice';
import NavBar from './NavBar';
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null }); 
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(registerUser(formData));
navigate('/')
      if (registerUser.fulfilled.match(resultAction)) {
      } else if (registerUser.rejected.match(resultAction)) {
        const errorPayload = resultAction.payload;
        console.error(errorPayload);

        if (errorPayload.errors) {
          setErrors(errorPayload.errors);
        } else if (errorPayload.message === 'User already exists') {
          setErrors({ email: 'This email is already in use.' });
        } else {
          setErrors('An error occurred while registering. Please try again.');
        }
      }
    } catch (err) {
      console.error(err);
      setErrors('An error occurred while registering. Please try again.');
    }
  };

 

  return (
    




<>
<NavBar/>

      <div className="register-container" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#f9f9f9', maxWidth: '400px', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
            <form onSubmit={onSubmit}>
            <p style={{ textAlign: 'center', marginTop: '10px' }}>cree un compte</p>

                <input className='form-control'  type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={onChange}
                required style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}  />
                {errors.name && <div className="error" style={{ color: 'red', marginTop: '10px' }}>{errors.name}</div>}

               
                <input className='form-control'   type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onChange}
                required style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}  />
                {errors.email && <div className="error" style={{ color: 'red', marginTop: '10px' }}>{errors.email}</div>}

                <input className='form-control' type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
                minLength="6"
                required style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}  />
               
               {errors.password && <div className="error" style={{ color: 'red', marginTop: '10px' }}>{errors.password}</div>}

                <button type="submit" style={{ padding: '8px 16px', borderRadius: '5px', background: 'purple', color: 'white', border: 'none', cursor: 'pointer' }}>S'inscrire</button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '10px' }}>Vous avez déjà un compte? <Link to="/">Connectez-vous</Link></p>
        </div>
































      </>

  );
};

export default Register;
