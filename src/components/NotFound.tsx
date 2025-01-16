import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import notFoundImage from '../assets/not-found.jpg';
import '../internationalization/i18n';
import { useTranslation } from 'react-i18next';

const NotFound: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Container className="bg-info-subtle text-center p-5">
            <Row>
                <Col>
                    <h1 className="text-danger">404 {t('notFound')}</h1>
                    <p className="text-muted">{t('pageDoesNotExist')}.</p>
                    <p>
                        <Image
                            src={notFoundImage}
                            style={{ maxHeight: '50vh', paddingBottom: '20px', paddingLeft: '20px' }}
                            fluid
                        />
                    </p>
                    <Button variant="primary" href="/">
                        {t('goBackHome')}
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound;
