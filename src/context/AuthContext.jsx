import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuth') === 'true';
        const userRole = localStorage.getItem('role') || '';
        const userName = localStorage.getItem('userName');

        if (isAuthenticated) {
            setIsLoggedIn(true);
            setUserInfo({ name: userName, role: userRole });

        }
         if (userRole === 'admin') {
            navigate('/admin');
        } else if (userRole === 'client') {
            navigate('/');
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
                (user) => user.email === email.toLowerCase() && user.password === password
            );

            if (!foundUser) {
                setErrors({ email: 'Las credenciales son inválidas' });
            } else {
                setIsLoggedIn(true);
                setUserInfo({ name: foundUser.name, role: foundUser.role });

                localStorage.setItem('isAuth', true);
                localStorage.setItem('role', foundUser.role);
                localStorage.setItem('userName', foundUser.name);
                if (foundUser.role === 'admin') {
                    localStorage.setItem('cart','');
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

    const logout = () => {
        setIsLoggedIn(false);
        setUserInfo(null);
        localStorage.removeItem('isAuth');
        localStorage.removeItem('role');
        localStorage.removeItem('userName');
        navigate('/');
    }

    return (
        <AuthContext.Provider value={{ email, setEmail, password, setPassword, handleSubmit, errors, isLoggedIn, userInfo, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);