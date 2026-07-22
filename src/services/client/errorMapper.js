import axios from 'axios';
import {
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ValidationError,
    ServerError,
    NetworkError,
    TimeoutError,
    AppError,
    SessionExpiredError,
    InvalidCredentialsError
} from '../../shared/errors/AppErrors';

export const mapAxiosError = (error) => {
    if (axios.isCancel(error)) {
        return new AppError('Request was cancelled', 'CANCELLED', 499, {}, false);
    }

    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        return new TimeoutError(error);
    }

    if (!error.response) {
        return new NetworkError(error);
    }

    const { status, data } = error.response;
    const details = data || {};

    switch (status) {
        case 400:
            return new InvalidCredentialsError(details);
        case 401:
            return new UnauthorizedError(details);
        case 403:
            return new ForbiddenError(details);
        case 404:
            return new NotFoundError(details);
        case 419:
            return new SessionExpiredError(details);
        case 422:
            return new ValidationError(details);
        default:
            if (status >= 500) {
                return new ServerError(details);
            }
            return new AppError('Terjadi kesalahan yang tidak terduga.', 'UNKNOWN_ERROR', status, details, false);
    }
};
