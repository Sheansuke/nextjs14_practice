interface NetworkResponse<T> {
    errorResponse: String,
    errorDescription: String,
    response: T
}