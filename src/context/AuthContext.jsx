import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const { setIsAuth } = useContext(CartContext);
    const [role, setRole] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        let validationErrors = {};
        if (!email) validationErrors.email = 'El correo electrónico es requerido';
        if (!password) validationErrors.password = 'La contraseña es requerida';

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
                setErrors({ email: 'Las credenciales son inválidas' });
            } else {
                if (foundUser.role === 'admin') {
                    setIsAuth(true);
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            }
        } catch (err) {
            console.error('Error al obtener los usuarios:', err);
            setErrors({ email: 'Algo salió mal. Por favor, inténtalo de nuevo más tarde.' });
        }
    };

    return(
        <AuthContext.Provider value ={{email, setEmail, password, setPassword, handleSubmit, errors }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);