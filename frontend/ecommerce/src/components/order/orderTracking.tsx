import React, { useEffect, useState } from 'react';
import './OrderTracking.css';
import { useLocation } from 'react-router-dom';

type OrderStatus = {
    status: string;
    estimatedDelivery: string;
};

const steps = [
    'Placed',
    'Pending',
    'Shipped',
    'Out for Delivery',
    'Delivered',
];

const OrderTracking: React.FC = () => {
    const [orderId, setOrderId] = useState('');
    const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const location = useLocation();
    const selectedorderId = location.state?.order.order_id;

    useEffect(() => {
        if (selectedorderId) {
            setOrderId(selectedorderId);
            fetchOrderStatus();
        }
    }, [selectedorderId]);

    const fetchOrderStatus = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/orders/${selectedorderId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();
            console.log("Fetched status:", data.status);

            if (response.ok && data.status) {
                const stepIndex = steps.findIndex(step => step === data.status);
                setCurrentStep(stepIndex !== -1 ? stepIndex : 0);
                setOrderStatus({
                    status: data.status,
                    estimatedDelivery: 'June 1, 2025',
                });
            }
        } catch (error) {
            console.error('Error fetching order status:', error);
        }
    };

    return (
        <div className="tracking-container">
            <h2>Track Your Order (Order ID: {selectedorderId})</h2>

            {orderStatus && (
                <div className="status-section">
                    <h3>Status: {orderStatus.status}</h3>

                    <div className="step-tracker">
                        {steps.map((step, index) => (
                            <div key={step} className="step-wrapper">
                                <div className={`step-circle 
                                    ${index < currentStep ? 'completed' : ''}
                                    ${index === currentStep ? 'current' : ''}`}>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`step-line ${index < currentStep ? 'completed' : ''}`}></div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="step-labels">
                        {steps.map((step) => (
                            <span key={step} className="step-label">{step}</span>
                        ))}
                    </div>

                    <p>Estimated Delivery: {orderStatus.estimatedDelivery}</p>
                </div>
            )}
        </div>
    );
};

export default OrderTracking;
