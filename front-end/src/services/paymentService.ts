import axios from '../axios/axiosClient';
import { ApiResponse, PaymentConfirmationDetails, PaymentCreatationDetails } from '../types';

export const createPaymentIntent = async (PaymentCreatationDetails: PaymentCreatationDetails): Promise<ApiResponse> => {
    const response = await axios.post<ApiResponse>('/payment/create', PaymentCreatationDetails);
    return response.data;
};

export const confirmPayment = async (PaymentConfirmationDetails: PaymentConfirmationDetails): Promise<ApiResponse> => {
    const response = await axios.post<ApiResponse>('/payment/confirm', PaymentConfirmationDetails);
    return response.data;
};
