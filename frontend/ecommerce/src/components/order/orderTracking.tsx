import React, { useEffect, useState } from 'react';
import './OrderTracking.css';

type OrderStatus = {
    status: string;
    estimatedDelivery: string;
};

const steps = [
    'Placed',
    'Shipped',
    'Out for Delivery',
    'Delivered',
];

const OrderTracking: React.FC = () => {
    const [orderId, setOrderId] = useState('');
    const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
    const [currentStep, setCurrentStep] = useState<number>(0);

    const isAdmin = true;
    //   const getCurrentStep = () => {
    //     return steps.findIndex(step => step === orderStatus?.status);
    //   };
    useEffect(()=>{
        handleTrackOrder('1')
    })
    const handleTrackOrder = (orderId:string) => {
        setOrderId(orderId)
        const sampleData: OrderStatus = {
            status: 'Out for Delivery',
            estimatedDelivery: 'June 1, 2025',
        };
        setTimeout(() => {
            setOrderStatus(sampleData);
        }, 300);
    };

    // const currentStep = getCurrentStep();
    const updateStatus = async () => {
        const nextStep = currentStep + 1;
        const newStatus = steps[nextStep];
console.log(nextStep,newStatus);

        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                setCurrentStep(nextStep);
                setOrderStatus({
                    status: newStatus,
                    estimatedDelivery: 'June 1, 2025',
                });
            }
        } catch (error) {
            console.error('Failed to update status', error);
        }
    };

    return (
        <div className="tracking-container">
            <h2>Track Your Order</h2>
            {/* <form onSubmit={handleTrackOrder}>
                <input
                    type="text"
                    placeholder="Enter Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    required
                />
                <button type="submit" disabled={!orderId}>Track</button>
            </form> */}

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
                        {steps.map((step, index) => (
                            <span key={step} className="step-label">{step}</span>
                        ))}
                    </div>

                    <p>Estimated Delivery: {orderStatus.estimatedDelivery}</p>
                </div>
            )}
            {/* Show button only for admins */}
            {currentStep < steps.length - 1 && isAdmin && (
                <button onClick={updateStatus} className="status-update-btn">
                    Move to Next Status
                </button>
            )}
        </div>

    );
};

export default OrderTracking;
