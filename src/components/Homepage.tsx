import React, { useContext, useEffect } from 'react';
import UserContext from '../context/UserContext.tsx';
import { Container, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store.tsx';
import ProductCatalog from './Product/ProductCatalog.tsx';
import { NavLink } from 'react-router-dom';
import { setCart } from '../features/cart/cartSlice.tsx';
import '../internationalization/i18n';
import { useTranslation } from 'react-i18next';

const Homepage: React.FC = () => {
    const { user } = useContext(UserContext);
    const cartCount = useSelector((state: RootState) => state.cart.totalItems);
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(setCart({ items: JSON.parse(localStorage.getItem('cartItems') || '{}') }));
    }, [dispatch]);

    return (
        <Container className="mt-5 d-flex flex-column align-items-center justify-content-center">
            {!user.isLoggedIn ? (
                <>
                    <h1>{t('pleaseLogIn')}</h1>
                    <NavLink to="/login">
                        <Button>{t('login')}</Button>
                    </NavLink>
                    <ProductCatalog />
                </>
            ) : (
                <>
                    <NavLink to="/cart">
                        <Button aria-label="view your shopping cart">
                            {t('yourCart')}: {cartCount === 0 ? t('empty') : `${cartCount} ${t('item')}${cartCount !== 1 ? 's' : ''}`}
                        </Button>
                    </NavLink>
                    <ProductCatalog />
                </>
            )}
        </Container>
    );
};

export default Homepage;
