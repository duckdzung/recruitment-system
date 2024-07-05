// Front-end package import
import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';

// Back-end package import
import { useAppDispatch } from '../../redux/hooks';
import { createPaymentIntentThunk } from '../../redux/payment/paymentThunks';
import { RootState } from '../../redux/store';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

// Stylesheet import
import styles from './Payment.module.scss';

// Image import
import visa from '../../assets/images/visa.png';
import chip from '../../assets/images/chip.png';

const Payment = () => {
    const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
    const dispatch = useAppDispatch();

    const { clientSecret, publishableKey, amount } = useSelector((state: RootState) => state.payment);

    // Run once on component mount
    useEffect(() => {
        createPayment();
    });

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
        <div className={styles.container}>
            <form action="" className={styles.paymentForm}>
                <div className={styles.card}>
                    <div className={styles.front}>
                        <div className={styles.cardBackground}>
                            <div></div>
                        </div>
                        <div className={styles.image}>
                            <img src={chip} alt="Visa Chip" />
                            <img src={visa} alt="Visa" />
                        </div>
                        <div className={styles.cardNumber}>################</div>
                        <div className={styles.cardInfo}>
                            <div className={styles.cardInfoSection01}>
                                <span>card holder</span>
                                <div className="cardHolderName">full name</div>
                            </div>
                            <div className={styles.cardInfoSection01}>
                                <span>expires</span>
                                <div className={styles.expiration}>
                                    <span className="expMonth">mm</span>
                                    <span>/</span>
                                    <span className="expYear">yy</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.back}>
                        <div className={styles.stripe}></div>
                        <div className={styles.cardInfoSection02}>
                            <div className={styles.cvvBox}></div>
                            <img src={visa} alt="Visa Logo" />
                        </div>
                    </div>
                </div>
                <div className={styles.details}>
                    {clientSecret && stripePromise && (
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                            <CheckoutForm />
                        </Elements>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Payment;
