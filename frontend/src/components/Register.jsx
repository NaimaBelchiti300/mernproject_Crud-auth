import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './footer';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const { name, email, password } = formData;
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        setError('');
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const body = JSON.stringify({ name, email, password });
            const response = await axios.post(`http://localhost:4000/api/users`, body, config);
            setSuccess('Inscription réussie! Redirection vers la page de connexion...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data) {
                setError(err.response.data.error || 'Une erreur s\'est produite.');
            } else {
                setError('Une erreur inattendue s\'est produite.');
            }
        }
    };

    return (
        <div className="register-container" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#f9f9f9', maxWidth: '400px', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
            <form onSubmit={onSubmit}>
                <input className='form-control' type="text" name="name" value={name} onChange={onChange} placeholder="Nom" style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }} required />
                <input className='form-control' type="email" name="email" value={email} onChange={onChange} placeholder="Email" style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }} required />
                <input className='form-control' type="password" name="password" value={password} onChange={onChange} placeholder="Mot de passe" style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }} required />
                <button type="submit" style={{ padding: '8px 16px', borderRadius: '5px', background: 'purple', color: 'white', border: 'none', cursor: 'pointer' }}>S'inscrire</button>
            </form>
            {error && <div className="error" style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            {success && <div className="success" style={{ color: 'green', marginTop: '10px' }}>{success}</div>}
            <p style={{ textAlign: 'center', marginTop: '10px' }}>Vous avez déjà un compte? <Link to="/login">Connectez-vous</Link></p>
        </div>
    );
};

export default Register;
