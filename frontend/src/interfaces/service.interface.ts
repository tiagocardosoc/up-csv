export interface IResponseApi<T = any> {
    message: string
    data?: T
    error?: boolean
} 