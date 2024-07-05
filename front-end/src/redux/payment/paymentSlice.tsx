import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaymentState } from '../../types';

const initialState: PaymentState = {
    recruitId: 0,
    paymentId: 0,
    amount: 1000,
    currency: '',
    clientSecret: '',
    publishableKey: '',
    error: '',
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        createPaymentIntentSuccess: (
            state,
            action: PayloadAction<{
                recruitId: number;
                paymentId: number;
                amount: number;
                currency: string;
                clientSecret: string;
                publishableKey: string;
            }>,
        ) => {
            state.recruitId = action.payload.recruitId;
            state.paymentId = action.payload.paymentId;
            state.amount = action.payload.amount;
            state.currency = action.payload.currency;
            state.clientSecret = action.payload.clientSecret;
            state.publishableKey = action.payload.publishableKey;
            state.error = '';
        },
        confirmPaymentSuccess: (
            state,
            action: PayloadAction<{
                recruitId: number;
                amount: number;
                currency: string;
                clientSecret: string;
                publishableKey: string;
            }>,
        ) => {
            state.recruitId = action.payload.recruitId;
            state.amount = action.payload.amount;
            state.currency = action.payload.currency;
            state.clientSecret = action.payload.clientSecret;
            state.publishableKey = action.payload.publishableKey;
            state.error = '';
        },
        paymentFailure: (state, action: PayloadAction<string>) => {
            state.recruitId = 0;
            state.paymentId = 0;
            state.amount = 0;
            state.currency = '';
            state.clientSecret = '';
            state.publishableKey = '';
            state.error = action.payload;
        },
        clearPayment: (state) => {
            state.recruitId = 0;
            state.paymentId = 0;
            state.amount = 0;
            state.currency = '';
            state.clientSecret = '';
            state.publishableKey = '';
            state.error = '';
        },
        updateRecruitId: (state, action: PayloadAction<number>) => {
            state.recruitId = action.payload;
        },
        updateAmount: (state, action: PayloadAction<number>) => {
            state.amount = action.payload;
        },
    },
});

export const {
    createPaymentIntentSuccess,
    confirmPaymentSuccess,
    paymentFailure,
    clearPayment,
    updateRecruitId,
    updateAmount,
} = paymentSlice.actions;
export default paymentSlice.reducer;
