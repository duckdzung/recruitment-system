export interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    role: Role | null;
    error: string | null;
}

export interface Credentials {
    email: string;
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

export enum Role {
    MEMBER = 'MEMBER',
    CANDIDATE = 'CANDIDATE',
    ENTERPRISE = 'ENTERPRISE',
    ADMIN = 'ADMIN',
}
