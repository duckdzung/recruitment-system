// Interface
export interface AuthState {
    username: string;
    isAuthenticated: boolean;
    accessToken: string;
    refreshToken: string;
    expirationTime: string;
    role: Role | null;
    error: string;
}

export interface PaymentState {
    recruitId: number;
    paymentId: number;
    amount: number;
    currency: string;
    clientSecret: string;
    publishableKey: string;
    error: string;
}

export interface Credentials {
    email: string;
    password: string;
}

export interface MemberDetails {
    name: string;
    phoneNumber: string;
    address: string;
    email?: string;
    companyName?: string;
    taxCode?: string;
    isValidated?: boolean;
    dateOfExpiration?: string;
    role?: Role;
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
    salary: number;
    experience: string;
    requiredInfo: string;
    nominee: Nominee;
    recruitmentInformation: RecruitmentInformation;
}

export interface AdvertisingForm {
    advertisingType: RecruitmentForm;
    recruitmentTime: string;
}

export interface PaymentCreatationDetails {
    recruitId: number;
    amount: number;
    currency: string;
    isFullPayment: boolean;
}

export interface PaymentConfirmationDetails {
    paymentId: number;
    paymentAmount: number;
    paymentMethod: PaymentMethod;
}

export interface FeedbackData {
    name: string;
    email: string;
    phoneNumber: string;
    trainingTips: string;
    message: string;
}

// Enum
export enum Role {
    MEMBER = 'MEMBER',
    CANDIDATE = 'CANDIDATE',
    ENTERPRISE = 'ENTERPRISE',
    STAFF = 'STAFF',
    PRESIDENT = 'PRESIDENT',
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

export enum PaymentMethod {
    CASH = 'CASH',
    BANK_TRANSFER = 'BANK_TRANSFER',
}
