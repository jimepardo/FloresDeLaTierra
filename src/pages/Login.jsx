import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';


const Login = () => {

    const { setIsAuth } = useContext(CartContext);

    const { email, setEmail, password, setPassword, handleSubmit, errors } = useAuth();

    return (
        <><br />
            <h2 style={{ color: '#333', textAlign: 'center' }}>Inicie Sesión</h2><br />
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
                        <label htmlFor="formBasicEmail" style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
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
                        <label htmlFor="formBasicPassword" style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
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
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </>
    )
}

export default Login;
