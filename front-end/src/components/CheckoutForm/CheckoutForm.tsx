import { PaymentElement } from '@stripe/react-stripe-js';
import { useState, FormEvent, useEffect } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../redux/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { confirmPaymentThunk } from '../../redux/payment/paymentThunks';
import { PaymentMethod } from '../../types';
import { useNavigate } from 'react-router-dom';

import styles from './CheckoutForm.module.scss';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { paymentId, amount } = useSelector((state: RootState) => state.payment);

    const [message, setMessage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {},
            redirect: 'if_required',
        });

        if (error) {
            if (error.type === 'card_error' || error.type === 'validation_error') {
                setMessage(error.message || 'An error occurred');
            } else {
                setMessage('An unexpected error occurred.');
            }
        } else {
            // Handle confirm payment success
            await dispatch(
                confirmPaymentThunk({
                    paymentId: paymentId,
                    paymentAmount: amount,
                    paymentMethod: PaymentMethod.BANK_TRANSFER,
                }),
            );

            navigate('/job-list');
            toast.success('Payment completed successfully');
            setMessage(null);
        }

        setIsProcessing(false);
    };

    useEffect(() => {
        document.querySelector;
    }, []);

    return (
        <div className={styles.checkoutForm}>
            <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" />

                <button disabled={isProcessing || !stripe || !elements} id="submit" className={styles.payBtn}>
                    <span id="button-text">{isProcessing ? 'Processing ... ' : 'Pay now'}</span>
                </button>

                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    );
};

export default CheckoutForm;
