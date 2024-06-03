// Interface
export interface AuthState {
    username: string | null;
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

interface Nominee {
    position: string;
    description: string;
}

interface RecruitmentInformation {
    timePeriod: TimePeriodType;
}

export interface RecruitmentDetails {
    quantity: number;
    requiredInfo: string;
    nominee: Nominee;
    recruitmentInformation: RecruitmentInformation;
}

export interface AdvertisingForm {
    advertisingType: RecruitmentForm;
    recruitmentTime: string;
}

// Enum
export enum Role {
    MEMBER = 'MEMBER',
    CANDIDATE = 'CANDIDATE',
    ENTERPRISE = 'ENTERPRISE',
    STAFF = 'STAFF',
    PRESIDENT = 'PRESIDENT',
}

export enum PaymentMethod {
    DIRECT = 'DIRECT',
    CREDIT_CARD = 'CREDIT_CARD',
}

export enum RecruitmentForm {
    NEWSPAPER = 'NEWSPAPER',
    ADVERTISEMENT_BANNER = 'ADVERTISEMENT_BANNER',
    WEBSITE = 'WEBSITE',
}

export enum TimePeriodType {
    ONE_WEEK = 'ONE_WEEK',
    TWO_WEEKS = 'TWO_WEEKS',
    ONE_MONTH = 'ONE_MONTH',
    TWO_MONTHS = 'TWO_MONTHS',
}
