export interface ILoginData {
    username: string,
    password: string
}

export interface IRegistrationData {
    username: string,
    password: string
}

export interface IAuthError {
    message: string
}

export interface IAuthSuccess {
    _id: string,
    email: string,
    token: string
}

export interface ILoginResponse {
    _id: string,
    email: string,
    token: string,
    message: string
}

export interface ICheckResponse {
    result: number;
}

export interface ICheckData { 
    text: string,
    language: string
}