import { useContext, useEffect } from 'react';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../features/cart/cartSlice';
import '../../internationalization/i18n';
import { useTranslation } from 'react-i18next';

const Logout: React.FC = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        // Clear user session from local storage
        localStorage.removeItem('userSession');
        localStorage.removeItem('cartItems');
    
        // Reset user context
        setUser({ name: '', isLoggedIn: false, token: '' });
    
        // Clear the cart in Redux state
        dispatch(clearCart());
    
        // Navigate back to login page
        navigate('/login');
    }, [navigate, setUser, dispatch]);
    
    return (
        <div aria-live="assertive">{t("loggingOut")}...</div>
    );
}

export default Logout;
