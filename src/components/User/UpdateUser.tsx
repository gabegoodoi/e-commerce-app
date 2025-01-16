import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../../internationalization/i18n';
import { useTranslation } from 'react-i18next';

const UpdateUser: React.FC = () => {
    const { t } = useTranslation();

    const [accountNumber, setAccountNumber] = useState('');
    const [username, setUsername] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);

    const handleUpdateUser = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://fakestoreapi.com/users/${accountNumber}`, {
                method: "PUT",
                body: JSON.stringify({
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
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Failed to update user. Please try again.');
            }

            const data = await response.json();
            console.log('User updated:', data);
            setSuccessMessage(true);            
        } catch (err) {
            console.error(err);
            setErrorMessage('An error occurred while updating the account.');
        }
    };

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">{t('updateUser')}</h1>
            <Row className="justify-content-center align-items-center h-100">
                <Col md={5}>
                    <Form onSubmit={handleUpdateUser}>
                        {errorMessage && <p className="text-danger" aria-live="assertive">{errorMessage}</p>}
                        {successMessage && <p className="text-success" aria-live="polite">{t('userUpdatedSuccessfully')}</p>}
                        <Form.Group controlId="accountNumber" className="mb-3">
                            <Form.Label>{t('userId')}</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder={t('placeholderUserId')}
                                value={accountNumber}
                                min="1"
                                max="20"
                                required
                                onChange={(e) => setAccountNumber(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="usernameInput" className="mb-3">
                            <Form.Label>{t('username')}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={t('placeholderUsername')}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="userEmailInput" className="mb-3">
                            <Form.Label>{t('email')}</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder={t('placeholderEmail')}
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="userPasswordInput" className="mb-3">
                            <Form.Label>{t('password')}</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder={t('placeholderPassword')}
                                value={userPassword}
                                onChange={(e) => setUserPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="firstNameInput" className="mb-3">
                            <Form.Label>{t('firstName')}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={t('placeholderFirstName')}
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="lastNameInput" className="mb-3">
                            <Form.Label>{t('lastName')}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={t('placeholderLastName')}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="phoneInput" className="mb-3">
                            <Form.Label>{t('phone')}</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder={t('placeholderPhone')}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            {t('updateUser')}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default UpdateUser;