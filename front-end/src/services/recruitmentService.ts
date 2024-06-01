import axios from '../axios/axiosClient';
import { ApiResponse, RecruitmentDetails, AdvertisingForm } from '../types';

export const createRecruitmentForm = async (
    recruitmentDetails: RecruitmentDetails,
    advertisingForm: AdvertisingForm,
): Promise<ApiResponse> => {
    const response = await axios.post<ApiResponse>('/recruitments', { recruitmentDetails, advertisingForm });
    return response.data;
};
