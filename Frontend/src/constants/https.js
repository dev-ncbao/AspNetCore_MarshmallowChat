// API Url
export const SERVER_URL = 'https://localhost:44369/api';
// Status code
export const STATUS_CODE = {
    // 2xx
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    // 3xx
    NOT_MODIFIED: 304,
    // 4xx
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    GONE: 410,
    // 5xx
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503
};

export const SERVER_ERROR_MESSAGE = {
    500: 'Lỗi máy chủ'
}

export const HTTP_METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

