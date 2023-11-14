interface NetworkResponse<T> {
    errorResponse: string,
    errorDescription: string,
    response: T
}