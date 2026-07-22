/**
 * Maps UserDTO to CurrentUser domain model
 * @param {import('./auth.dto').UserDTO} dto
 * @returns {import('./auth.types').CurrentUser}
 */
export const mapUserDTOToModel = (dto) => {
    if (!dto) return null;

    return {
        id: dto.id,
        username: dto.username,
        email: dto.email,
        role: dto.role,
        firstName: dto.first_name,
        lastName: dto.last_name,
        fullName: `${dto.first_name || ''} ${dto.last_name || ''}`.trim()
    };
};

/**
 * Maps LoginResponseDTO to LoginResult domain model
 * @param {import('./auth.dto').LoginResponseDTO} dto
 * @returns {import('./auth.types').LoginResult}
 */
export const mapLoginResponseDTOToModel = (dto) => {
    return {
        tokens: {
            accessToken: dto.access_token,
            refreshToken: dto.refresh_token
        },
        user: mapUserDTOToModel(dto.user)
    };
};

/**
 * Maps RefreshResponseDTO to AuthTokens domain model
 * @param {import('./auth.dto').RefreshResponseDTO} dto
 * @returns {import('./auth.types').AuthTokens}
 */
export const mapRefreshResponseDTOToModel = (dto) => {
    return {
        accessToken: dto.access_token,
        refreshToken: dto.refresh_token
    };
};
