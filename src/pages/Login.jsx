import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';


const Login = () => {

    const { setIsAuth } = useContext(CartContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let validationErrors = {};
        if (!email) validationErrors.email = 'Email es requerido';
        if (!password) validationErrors.password = 'Password es requerido';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const res = await fetch('data/users.json');
            const users = await res.json();

            const foundUser = users.find(
                (user) => user.email === email && user.password === password
            );

            if (!foundUser) {
                setErrors({ email: 'credenciales invalidas' });
            } else {
                //console.log('User role:', foundUser.role);

                if (foundUser.role === 'admin') {
                    setIsAuth(true);

                    navigate('/admin');
                } else {
                    navigate('/');
                }
            }
        } catch (err) {
            console.error('Error fetching users:', err);
            setErrors({ email: 'Algo salió mal. Por favor, inténtalo de nuevo más tarde.' });
        }
    };


    return (
        <><br />
            <h2 style={{ color: '#333', textAlign: 'center' }}>Inicie Sesión</h2><br />
            <div className='container-fluid justify-content-center'>
                <h2>Login</h2><br />
                <form style={{ marginLeft: '60px' }} onSubmit={handleSubmit} >
                    <input
                        className='form-control '
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ingresa tu email"
                    /> <br />

                    <input
                        className='form-control '
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingresa tu contraseña"
                    /> <br /><br />
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </>
    )
}

export default Login
