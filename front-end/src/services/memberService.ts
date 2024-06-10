import axios from '../axios/axiosClient';
import { ApiResponse, MemberDetails } from '../types';

export const updateMember = async (memberDetails: MemberDetails): Promise<ApiResponse> => {
    const response = await axios.post<ApiResponse>('/members', memberDetails);
    return response.data;
};
