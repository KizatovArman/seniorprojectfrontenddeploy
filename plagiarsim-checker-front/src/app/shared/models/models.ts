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
    tokeen: string
}