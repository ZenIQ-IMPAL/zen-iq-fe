import { API_BASE_URL, getAuthHeaders } from "./config";

interface CreatePaymentRequestBody {
    subscription_plan_id: string;
}

export interface CreatePaymentRequest {
    subscriptionPlanId: string;
}

export interface CreatePaymentResponse {
    orderId: string;
    snapToken: string;
    redirectUrl: string;
    amount: number;
    subscriptionPlanId: string;
}

export interface PaymentStatus {
    orderId: string;
    status: string;
    amount: number;
    paymentType?: string;
    transactionTime?: string;
}

export interface Payment {
    id: string;
    order_id: string;
    user_id: string;
    subscription_plan_id: string;
    amount: string;
    status: string;
    payment_type: string | null;
    snap_token: string;
    snap_redirect_url: string;
    created_at: string;
    updated_at: string;
}

export interface SubscriptionStatus {
    isActive: boolean;
    subscriptionId?: string;
    planName?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
}

export interface SubscriptionHistory {
    id: string;
    user_id: string;
    subscription_plan_id: string;
    payment_id: string;
    start_date: string;
    end_date: string;
    status: string;
    created_at: string;
    updated_at: string;
}

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}

const handleResponse = async <T>(response: Response): Promise<T> => {
    const result: ApiResponse<T> = await response.json();

    const shouldThrow = !response.ok || !result.success;

    return shouldThrow
        ? Promise.reject(new Error(result.message || "Request failed"))
        : (result.data as T);
};

const createFetchOptions = (method: string, body?: unknown): RequestInit => {
    const baseOptions: RequestInit = {
        method,
        headers: getAuthHeaders(),
        credentials: "include" as RequestCredentials,
    };

    return body
        ? { ...baseOptions, body: JSON.stringify(body) }
        : baseOptions;
};

export const createPayment = async (
    request: CreatePaymentRequest
): Promise<CreatePaymentResponse> => {
    const requestBody: CreatePaymentRequestBody = {
        subscription_plan_id: request.subscriptionPlanId,
    };

    const response = await fetch(
        `${API_BASE_URL}/api/payments/create`,
        createFetchOptions("POST", requestBody)
    );

    const rawData = await handleResponse<any>(response);

    return {
        orderId: rawData.order_id || rawData.orderId,
        snapToken: rawData.snap_token || rawData.snapToken,
        redirectUrl: rawData.redirect_url || rawData.redirectUrl,
        amount: rawData.amount,
        subscriptionPlanId: rawData.subscription_plan_id || rawData.subscriptionPlanId,
    };
};

export const getPaymentStatus = async (orderId: string): Promise<PaymentStatus> => {
    const response = await fetch(
        `${API_BASE_URL}/api/payments/status/${orderId}`,
        createFetchOptions("GET")
    );

    return handleResponse<PaymentStatus>(response);
};

export const getMyPayments = async (): Promise<Payment[]> => {
    const response = await fetch(
        `${API_BASE_URL}/api/payments/my-payments`,
        createFetchOptions("GET")
    );

    return handleResponse<Payment[]>(response);
};

export const getSubscriptionStatus = async (): Promise<SubscriptionStatus> => {
    const response = await fetch(
        `${API_BASE_URL}/api/payments/subscription/status`,
        createFetchOptions("GET")
    );

    return handleResponse<SubscriptionStatus>(response);
};

export const cancelSubscription = async (): Promise<void> => {
    const response = await fetch(
        `${API_BASE_URL}/api/payments/subscription/cancel`,
        createFetchOptions("POST")
    );

    return handleResponse<void>(response);
};

export const getSubscriptionHistory = async (): Promise<SubscriptionHistory[]> => {
    const response = await fetch(
        `${API_BASE_URL}/api/payments/subscription/history`,
        createFetchOptions("GET")
    );

    return handleResponse<SubscriptionHistory[]>(response);
};
