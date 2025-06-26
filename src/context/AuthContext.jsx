import { createContext, useContext, useState, useEffect } from 'react';
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

    useEffect(()=> {
        const isAuthenticated = localStorage.getItem('isAuth') === 'true';
        const userRole = localStorage.getItem('role') || '';

        if(isAuthenticated && userRole === 'admin'){
            setIsAuth(true)
            setRole(userRole)
            navigate('/admin')
        }else if(isAuthenticated && userRole === 'client'){
            setIsAuth(true)
            setRole(userRole)
            navigate('/')
        }
    }, [])

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
                    localStorage.setItem('isAuth', true);
                    localStorage.setItem('role', foundUser.role);
                    navigate('/admin');
                } else {
                    setIsAuth(true);
                    localStorage.setItem('isAuth', true);
                    localStorage.setItem('role', foundUser.role);
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