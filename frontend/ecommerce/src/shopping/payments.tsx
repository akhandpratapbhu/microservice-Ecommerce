import React, { useEffect, useState } from 'react';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe("pk_test_51PVq7g00cRf59ySi2IqqCppVQCR5iEB9E2Qi0ia0cq90xLXCLSfo2OP7lp85tFymjs2HKYXGo0KmWJI5EDigrvMO00EFPtYNOH");//pk_test_...

const CheckoutForm = ({ connectedAccountId }: { connectedAccountId: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    console.log("connectedAccountId", connectedAccountId);
  }, [connectedAccountId]);
  
  useEffect(() => {
    axios.post("http://localhost:3003/create-payment-intent", {
      amount: 1000,
    }).then(res => {
      setClientSecret(res.data.clientSecret);
    });
  }, []);

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
        console.error("Stripe.js has not yet loaded.");
        return;
      }
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        console.error("CardElement not found");
        return;
      }
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

    if (!error) {
      alert("Payment successful!");
      // Now transfer the money to the connected account
      await axios.post("http://localhost:3003/transfer-money", {
        amount: 800, // send part of the money
        connectedAccountId,
      });
      alert("Transfer to user successful!");
    } else {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button disabled={!stripe}>Pay & Send</button>
    </form>
  );
};

export default function PaymentPage() {
  const [onboardingLink, setOnboardingLink] = useState("");
  const [connectedAccountId, setConnectedAccountId] = useState("");
  useEffect(() => {
    console.log("connectedAccountIdpayment", connectedAccountId);
  }, [connectedAccountId]);
  
  const createConnectedAccount = async () => {
    const res = await axios.post("http://localhost:3003/create-connected-account");
    setOnboardingLink(res.data.url);
    setConnectedAccountId(res.data.accountId);
  };

  return (
    <div>
      <h2>Send Money to Someone</h2>
      <button onClick={createConnectedAccount}>Register Recipient (Stripe Onboarding)</button>
      {onboardingLink && (
        <a href={onboardingLink} target="_blank" rel="noopener noreferrer">Complete Onboarding</a>
      )}
      {connectedAccountId && (
        <Elements stripe={stripePromise}>
          <CheckoutForm connectedAccountId={connectedAccountId} />
        </Elements>
      )}
    </div>
  );
}
