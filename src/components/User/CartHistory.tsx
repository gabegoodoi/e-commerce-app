import React, { useState } from 'react';
import { Button, Card, Row, Col, Spinner, Alert, Form, Container } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import '../../internationalization/i18n';

interface Cart {
    id: number;
    date: string;
    products: {
        productId: number;
        quantity: number;
    }[];
}

const fetchCarts = async (userId: number) => {
    const response = await fetch('https://fakestoreapi.com/carts');
    const carts = await response.json();
    return carts.filter((cart: Cart) => cart.id === userId); // Filter carts for the current user
};

const fetchProductDetails = async (productId: number, t: (key: string) => string) => {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    if (!response.ok) {
        throw new Error(`${t('errorFetchingProduct')} ${productId}`);
    }
    return response.json(); // Return product details
};

const CartHistory = () => {
    const [userId, setUserId] = useState<string>(''); 
    const [inputError, setInputError] = useState<string>(''); 
    const [selectedOrder, setSelectedOrder] = useState<Cart | null>(null); 
    const [productDetails, setProductDetails] = useState<any[]>([]);
    const { t } = useTranslation();

    const { data: carts, isLoading, error } = useQuery({
        queryKey: ['carts', userId],
        queryFn: () => fetchCarts(Number(userId)), // Fetch carts for the current user based on input userId
        refetchOnWindowFocus: false,
        retry: 3,
        enabled: !!userId, // Only run the query when userId is not empty
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (isNaN(Number(userId)) || userId.trim() === '') {
            setInputError(t('idInputError'));
        } else {
            setInputError('');
        }
    };

    const handleOrderClick = async (order: Cart) => {
        setSelectedOrder(order); // Set the clicked order as the selected one
        const productIds = order.products.map((product) => product.productId);
        try {
            // Fetch all product details for the selected order
            const details = await Promise.all(
                productIds.map((id: number) => fetchProductDetails(id, t))
            );
            setProductDetails(details); // Store product details in state
        } catch (err) {
            console.error(t('errorFetchingProduct'), err);
        }
    };

    const handleHideDetails = () => {
        setSelectedOrder(null); // Hide the order details by resetting selectedOrder
        setProductDetails([]); // Clear product details
    };

    if (isLoading) {
        return (
            <Spinner animation="border" role="status" aria-live="polite">
                <span className="visually-hidden">{t('loading')}...</span>
            </Spinner>
        );
    }

    if (error) {
        return <Alert variant="danger" aria-live="assertive">{(error as Error).message}</Alert>;
    }

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">{t('cartHistory')}</h2>
            <Form onSubmit={handleSearch}>
                <Form.Group controlId="userId">
                    <Form.Label>{t('enterUserId')}</Form.Label>
                    <Form.Control
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder={t('placeholderEnterUserId')}
                    />
                    {inputError && <Alert variant="danger" className="mt-2">{inputError}</Alert>}
                </Form.Group>
            </Form>

            {carts?.length === 0 && userId && !inputError ? (
                <Alert variant="info">
                    {t('noOrdersFound')}: {userId}.
                </Alert>
            ) : (
                <Row xs={1} md={4} className="g-4 mt-4">
                    {carts?.map((cart: Cart) => (
                        <Col key={cart.id}>
                            <Card
                                style={{ width: '18rem' }}
                                onClick={() => handleOrderClick(cart)}
                                tabIndex={0}
                                role="button"
                                aria-label={`view details for order ${cart.id}`}
                            >
                                <Card.Body>
                                    <Card.Title><strong>{t('order')} #{cart.id}</strong></Card.Title>
                                    <Card.Text><strong>{t('date')}:</strong> {new Date(cart.date).toLocaleDateString()}</Card.Text>
                                    <Card.Text><strong>{t('totalItems')}:</strong> {cart.products.reduce((acc, product) => acc + product.quantity, 0)}</Card.Text>
                                    <Button variant="primary">{t('viewDetails')}</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {selectedOrder && (
                <div id="order-details" aria-labelledby="order-details-title" tabIndex={-1} className="mt-4">
                    <h3 id="order-details-title" className="text-center mb-4">{t('orderDetails')}</h3>
                    <Card>
                        <Card.Body>
                            <Card.Title><strong>{t('order')} #{selectedOrder.id} Details</strong></Card.Title>
                            <Card.Text><strong>{t('date')}:</strong> {new Date(selectedOrder.date).toLocaleDateString()}</Card.Text>
                            <h5 id="product-details-title">{t('products')}:</h5>
                            <ul>
                                {productDetails.length > 0 && productDetails.map((product, index) => (
                                    <li key={product.id}>
                                        {t('productName')}: {product.title}, {t('price')}: ${product.price}, {t('quantity')}: {selectedOrder.products[index].quantity}
                                    </li>
                                ))}
                            </ul>
                            <Button variant="secondary" onClick={handleHideDetails}>{t('hideDetails')}</Button>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </Container>
    );
};

export default CartHistory;
