import axios from '../axios/axiosClient';
import {ApiResponse, FeedbackData} from '../types';

export const feedback = async (feedbackData: FeedbackData): Promise<ApiResponse> => {
    const response = await axios.post<ApiResponse>('/feedback', feedbackData);
    return response.data;
};
