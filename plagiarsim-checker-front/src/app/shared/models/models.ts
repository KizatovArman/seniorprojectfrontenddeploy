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
    success: boolean,
    msg: string
}

export interface ILoginResponse {
    success: boolean,
    token: string
}

export interface ILogoutSuccess {
    success: boolean,
    msg: string
}

export interface ICheckResponse {
    result: number;
}

export interface ICheckData { 
    language: string,
    text: string
}

export interface IGoogleCloud { 
    instances: number[][]
}

export interface IGoogleCloudSuccess {
    predictions: string[]
}

export interface GoogleToken {
    token: string
}

export interface IBackCheckResponse {
    result: number
}