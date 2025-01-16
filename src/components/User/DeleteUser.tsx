import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../../internationalization/i18n';
import { useTranslation } from 'react-i18next';

const DeleteUser: React.FC = () => {
    const { t } = useTranslation();

    const [accountNumber, setAccountNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);

    const handleDeleteUser = (e: React.FormEvent) => {
        e.preventDefault();

        // API DELETE request
        fetch(`https://fakestoreapi.com/users/${accountNumber}`, {
            method: "DELETE"
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(t('noResponseError'));
            }
            return res.json();
        })
        .then((data) => {
            console.log('User deleted:', data);
            setSuccessMessage(true);            
        })
        .catch((err) => {
            console.error(err);
            setErrorMessage('An error occurred while deleting the account.');
        });
    };

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">{t('deleteUser')}</h1>
            <Row className="justify-content-center align-items-center h-100">
                <Col md={5}>
                    <Form onSubmit={handleDeleteUser}>
                        {errorMessage && <p aria-live="assertive" className="text-danger">{errorMessage}</p>}
                        {successMessage && <p aria-live="polite" className="text-success">{t('userDeletedSuccess')}</p>}
                        <Form.Group controlId="accountNumber" className="mb-3">
                            <Form.Label>{t('userId')}</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder={t('enterUserId')}
                                value={accountNumber}
                                min="1"
                                max="20"
                                required
                                onChange={(e) => setAccountNumber(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            {t('deleteUser')}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default DeleteUser;