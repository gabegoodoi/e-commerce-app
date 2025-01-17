import React, { useContext, useState } from 'react';
import UserContext from "../../context/UserContext.tsx";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../../internationalization/i18n';
import { useTranslation } from 'react-i18next';

const CreateUser: React.FC = () => {
    const { setUser } = useContext(UserContext); // Use only setUser
    const { t } = useTranslation();

    const [username, setUsername] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);

    const handleCreateUser = (e: React.FormEvent) => {
        e.preventDefault();

        const mockUser = {
            email: userEmail,
            username: username,
            password: userPassword,
            name: {
                firstname: firstName,
                lastname: lastName,
            },
            address: {
                city: 'N/A',
                street: 'N/A',
                number: 0,
                zipcode: '00000',
                geolocation: {
                    lat: '0',
                    long: '0',
                },
            },
            phone: phone,
        };

        // Mock API POST request
        fetch('https://fakestoreapi.com/users', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(mockUser),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(t('noResponseError'));
            }
            return res.json();
        })
        .then((data) => {
            console.log(t('userCreated'), data);
            // Set the created user in context
            setUser(data);
            setSuccessMessage(true);

            // Reset form fields
            setUsername('');
            setUserPassword('');
            setUserEmail('');
            setFirstName('');
            setLastName('');
            setPhone('');
        })
        .catch((err) => {
            console.error(err);
            setErrorMessage(t('noResponseError'));
        });
    };

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">{t('createUser')}</h1>
            <Row className="justify-content-center align-items-center">
                <Col md={5}>
                    <Form onSubmit={handleCreateUser}>
                        {errorMessage && <p aria-live="assertive" className="text-danger">{errorMessage}</p>}
                        {successMessage && <p aria-live="polite" className="text-success">{t('createUserSuccess')}</p>}
                        <Form.Group controlId="usernameInput" className="mb-3">
                            <Form.Label>{t('username')}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={t('placeholderUsername')}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="userEmailInput" className="mb-3">
                            <Form.Label>{t('email')}</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder={t('placeholderEmail')}
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="userPasswordInput" className="mb-3">
                            <Form.Label>{t('password')}</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder={t('placeholderPassword')}
                                value={userPassword}
                                onChange={(e) => setUserPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="firstNameInput" className="mb-3">
                            <Form.Label>{t('firstName')}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={t('placeholderFirstName')}
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="lastNameInput" className="mb-3">
                            <Form.Label>{t('lastName')}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={t('placeholderLastName')}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="phoneInput" className="mb-3">
                            <Form.Label>{t('phone')}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={t('placeholderPhone')}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            {t('createUser')}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default CreateUser;
