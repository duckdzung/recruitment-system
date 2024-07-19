import axios from '../axios/axiosClient';
import { ApiResponse, PaymentCreatationDetails } from '../types';

export const uploadProfile = async (PaymentCreatationDetails: PaymentCreatationDetails): Promise<ApiResponse> => {
    const response = await axios.post<ApiResponse>('/payment/create', PaymentCreatationDetails);
    return response.data;
};

export const applyJob = async (nomineeId: number, recruitId: number, profileId: number): Promise<ApiResponse> => {
    const response = await axios.post<ApiResponse>('/application-form', { nomineeId, recruitId, profileId });
    return response.data;
};
