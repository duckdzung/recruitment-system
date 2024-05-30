import axios from '../axios/axiosClient';
import { ApiResponse, MemberDetails } from '../types';

export const updateMember = async (memberDetails: MemberDetails): Promise<ApiResponse> => {
    const response = await axios.put<ApiResponse>('/members', memberDetails);
    return response.data;
};
