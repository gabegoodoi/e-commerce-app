import React, { useContext, useState, useEffect } from 'react';
import UserContext from "../../context/UserContext.tsx";
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../../internationalization/i18n';
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        // Check for existing user session
        const storedUser = localStorage.getItem('userSession');
        if (storedUser) {
            const userSession = JSON.parse(storedUser);
            if (userSession.isLoggedIn) {
                setUser(userSession);  // Set the user data in context
                navigate('/home');  // Redirect to home if already logged in
            }
        }
    }, [navigate, setUser]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
    
        // API call to authenticate user
        fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: userPassword,
            }),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Invalid username or password');
            }
            return res.json();
        })
        .then((data) => {
            if (!data.token) {
                throw new Error('Invalid credentials');
            }
    
            // Create the session object with the required 'name' field
            const userSession = {
                name: username, // Or set to an empty string if unavailable
                username: username,
                password: userPassword,
                isLoggedIn: true,
                token: data.token,
            };
    
            // Save the session data to localStorage
            localStorage.setItem('userSession', JSON.stringify(userSession));
            setUser(userSession);
    
            console.log(userSession);
    
            navigate('/home');
        })
        .catch((err) => {
            console.error(err);
            setErrorMessage(err.message || 'Failed to login');
        });
    };
    

    return (
        <Container className="mb-5">
            <h1 className="text-center m-4">{t("logIn")}</h1>
            <Row className="justify-content-center align-items-center h-100">
                <Col md={5}>
                    <Form onSubmit={handleLogin}>
                        {errorMessage && <p aria-live="assertive" className="text-danger">{errorMessage}</p>}
                        <Form.Group controlId="usernameInput" className="mb-3">
                            <Form.Label>{t('username')} (Test: mor_2314)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={t("placeholderUsername")}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="userPasswordInput" className="mb-3">
                            <Form.Label>Password (Test: 83r5^_)</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder={t("placeholderPassword")}
                                value={userPassword}
                                onChange={(e) => setUserPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            {t("login")}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;