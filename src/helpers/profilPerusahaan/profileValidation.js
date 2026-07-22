export function validateRequired(value) {
    if (!value || value.toString().trim() === '') {
        return false;
    }
    return true;
}

export function validateForm(data, requiredFields) {
    const errors = {};
    requiredFields.forEach(field => {
        if (!validateRequired(data[field])) {
            errors[field] = 'Field ini wajib diisi';
        }
    });
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}
