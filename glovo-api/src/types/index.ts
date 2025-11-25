export interface Customer {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
}

export interface ErrorResponse {
    success: false;
    message: string;
}