import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../redux/hooks';
import { createPaymentIntentThunk } from '../../redux/payment/paymentThunks';
import { RootState } from '../../redux/store';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const Payment2 = () => {
    const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
    const dispatch = useAppDispatch();

    const { clientSecret, publishableKey, amount } = useSelector((state: RootState) => state.payment);

    // Run once on component mount
    useEffect(() => {
        createPayment();
    }, []);

    // Update stripePromise when publishableKey changes
    useEffect(() => {
        if (publishableKey) {
            setStripePromise(loadStripe(publishableKey));
        }
    }, [publishableKey]);

    const createPayment = async () => {
        await dispatch(
            createPaymentIntentThunk({
                recruitId: 1,
                amount: amount,
                currency: 'usd',
                isFullPayment: true,
            }),
        );
    };

    return (
        <>
            {clientSecret && stripePromise && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm />
                </Elements>
            )}
        </>
    );
};

export default Payment2;
