export interface AuthState {
    isAuthenticated: boolean;
    isUpdatedMember?: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    error: string | null;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    email: string;
    username: string;
    password: string;
}

export interface MemberDetails {
    name: string;
    phoneNum: string;
    address: string;
    companyName?: string;
    taxCode?: string;
}

export interface AxiosError {
    response?: {
        status: number;
        data: {
            message: string;
        };
    };
    message: string;
}

export interface ApiResponse {
    statusCode: number;
    message: string;
    data: any;
}
