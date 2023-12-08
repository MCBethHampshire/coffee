export const mockUser = {
    jwt: "hshshshshshs",
    user: {
        id: 5,
        username: "Beth test",
        email: "test@test",
        password: "password123",
        provider: "local",
        confirmed: true,
        blocked: false,
        createdAt: "2022-04-20T12:58:42.6612",
        updatedAt: "2022-04-20T12:58:42.6612",
    },
};

export const ValidationError = {
    error: {
        status: 400,
        name: "ValidationError",
        message: "Invalid identifier or password",
        details: {},
    },
};

export const RegistrationError = {
    error: {
        status: 400,
        name: "ApplicationError",
        message: "An error occurred during account creation",
        details: {},
    },
};