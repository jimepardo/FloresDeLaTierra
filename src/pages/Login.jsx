import React from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {

    const { email, setEmail, password, setPassword, handleSubmit, errors } = useAuth();

    return (
        <div id='main-content-wrapper'>
            <br />
            <div style={{ padding: '20px', maxWidth: '80%', margin: '0 auto' }}>
                <h1 style={{ color: '#344E41', textAlign: 'center' }}>Inicie Sesión</h1><br />
                <div className='container-fluid justify-content-center'>
                    <form style={{
                        marginLeft: '60px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        maxWidth: '400px',
                        margin: 'auto',
                    }} onSubmit={handleSubmit} >
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label htmlFor="formBasicEmail" style={{ color:'#344E41', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                Correo electrónico</label>
                            <input
                                className='form-control '
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Ingresa tu correo electrónico"
                                style={{
                                    padding: '0.5rem',
                                    border: `1px solid ${errors.email ? 'red' : '#ced4da'}`,
                                    borderRadius: '0.25rem',
                                }}
                            />
                            {errors.email && (
                                <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }} >{errors.email}</div>
                            )}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label htmlFor="formBasicPassword" style={{ color:'#344E41', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                Contraseña</label>
                            <input
                                className='form-control '
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Ingresa tu contraseña"
                                style={{
                                    padding: '0.5rem',
                                    border: `1px solid ${errors.password ? 'red' : '#ced4da'}`,
                                    borderRadius: '0.25rem',
                                }}
                            />
                            {errors.password && (
                                <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }} >{errors.password}</div>
                            )}
                        </div>
                        <button className='btnSession btn' style={{ color: '#fff' }} type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
