export class AppError extends Error {
    constructor(message, code, status, details = {}, retryable = false) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.status = status;
        this.details = details;
        this.retryable = retryable;
    }
}

export class UnauthorizedError extends AppError {
    constructor(details) {
        super('Akses ditolak. Silakan login terlebih dahulu.', 'UNAUTHORIZED', 401, details, false);
    }
}

export class SessionExpiredError extends AppError {
    constructor(details) {
        super('Sesi Anda telah berakhir, silakan login kembali.', 'SESSION_EXPIRED', 419, details, false);
    }
}

export class InvalidCredentialsError extends AppError {
    constructor(details) {
        super('Kredensial yang Anda masukkan salah.', 'INVALID_CREDENTIALS', 400, details, false);
    }
}

export class ForbiddenError extends AppError {
    constructor(details) {
        super('Anda tidak memiliki akses ke sumber daya ini.', 'FORBIDDEN', 403, details, false);
    }
}

export class NotFoundError extends AppError {
    constructor(details) {
        super('Data yang Anda cari tidak ditemukan.', 'NOT_FOUND', 404, details, false);
    }
}

export class ValidationError extends AppError {
    constructor(details) {
        super('Input yang Anda berikan tidak valid.', 'VALIDATION_ERROR', 422, details, false);
    }
}

export class ServerError extends AppError {
    constructor(details) {
        super('Terjadi kesalahan pada server. Silakan coba lagi nanti.', 'SERVER_ERROR', 500, details, true);
    }
}

export class NetworkError extends AppError {
    constructor(details) {
        super('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.', 'NETWORK_ERROR', 0, details, true);
    }
}

export class TimeoutError extends AppError {
    constructor(details) {
        super('Permintaan memakan waktu terlalu lama.', 'TIMEOUT_ERROR', 408, details, true);
    }
}
