import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearPayment, createPaymentIntentSuccess, paymentFailure } from './paymentSlice';
import { createPaymentIntent, confirmPayment } from '../../services/paymentService';
import { AxiosError, PaymentConfirmationDetails, PaymentCreatationDetails, PaymentState } from '../../types';
import { toast } from 'react-toastify';

export const createPaymentIntentThunk = createAsyncThunk(
    'payment/createPaymentIntent',
    async (PaymentCreatationDetails: PaymentCreatationDetails, { dispatch }) => {
        try {
            const response = await createPaymentIntent(PaymentCreatationDetails);
            const payload: PaymentState = {
                recruitId: response.data.payment.recruitmentInformation.recruitId,
                paymentId: response.data.payment.paymentId,
                amount: response.data.paymentIntentResponse.amount,
                currency: response.data.paymentIntentResponse.currency,
                clientSecret: response.data.paymentIntentResponse.clientSecret,
                publishableKey: response.data.paymentIntentResponse.publishableKey,
                error: '',
            };

            dispatch(createPaymentIntentSuccess(payload));
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage = axiosError.response?.data.message || axiosError.message;
            dispatch(paymentFailure(errorMessage));
            toast.error(errorMessage);
        }
    },
);

export const confirmPaymentThunk = createAsyncThunk(
    'payment/confirmPayment',
    async (paymentConfirmationDetails: PaymentConfirmationDetails, { dispatch }) => {
        try {
            await confirmPayment(paymentConfirmationDetails);
            dispatch(clearPayment());
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage = axiosError.response?.data.message || axiosError.message;
            toast.error(errorMessage);
        }
    },
);
