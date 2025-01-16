import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import notFoundImage from '../assets/not-found.jpg';
import '../internationalization/i18n';
import { useTranslation } from 'react-i18next';

const AccessDenied: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Container className="bg-info-subtle text-center p-5">
            <Row>
                <Col>
                    <h1 className="text-danger">403 {t('accessDenied')}</h1>
                    <p className="text-muted">{t('toAccessThisPage')}.</p>
                    <p>
                        <Image src={notFoundImage} style={{ maxHeight: '50vh', paddingBottom: '20px', paddingLeft: '20px' }} fluid />
                    </p>
                    <Button variant="primary" href="/login">{t('login')}</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default AccessDenied;
