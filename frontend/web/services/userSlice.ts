import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";

type RequestState = "pending" | "fulfilled" | "rejected";

export type UserState = {
    jwt: string;
    username: string;
    email: string;
    requestState?: RequestState;
    error?: SerializedError;
};

export type LoginData = {
    identifier?: string, 
    password?: string,
}

export type RegistrationData = {
    username: string;
    email: string;
    password: string;
}

type UserPaylod = { 
    jwt: string; 
    user: { 
        username: string; 
        email: string; 
    }};

export const initialState: UserState = {
    jwt: "",
    username: "",
    email: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //Login flow
        builder
        // .addCase(login.fulfilled, (state, { payload }) => {
        //     state.requestState = "fulfilled";
        //     state.jwt = payload.jwt;
        //     state.username = payload.user.username;
        //     state.email = payload.user.email;
        //     state.error = undefined;
        // })
        .addCase(login.pending, (state) => {
            state.requestState = "pending";
            state.error = undefined;
        })
        .addCase(login.rejected, (state, { payload }) => {
            state.requestState = "rejected";
            const payloadError = (payload as {error: SerializedError})?.error;
            state.error = payloadError;
        });
        //Logout flow
        builder.addCase(logout.fulfilled, () => initialState);
        builder.addMatcher<PayloadAction<UserPaylod>>(
            (action) => /\/(login|registration)\/fulfilled$/.test(action.type),
            (state, { payload }) => {
                state.requestState = "fulfilled";
                state.jwt = payload.jwt;
                state.username = payload.user.username;
                state.email = payload.user.email;
                state.error = undefined;
                }
            );
    },
});

export const { actions, reducer } = userSlice;

const api_url = process.env.NEXT_PUBLIC_STRAPI_API_URL;

const clearUserInfoFromLocalStorage = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
};

const setupUserInfoToLocalStorage = (result: UserPaylod) => {
    localStorage.setItem("jwt", result.jwt);
    localStorage.setItem("username", result?.user?.username);
    localStorage.setItem("email", result?.user?.email);
}

export const login = createAsyncThunk<UserPaylod, LoginData>(
    "user/login",
    async (loginData, {rejectWithValue}) => {
        try {
            const jwt = localStorage.getItem("jwt");

        const response = jwt ?
            await fetch(`${api_url}/users/me`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                }
            })
        : await fetch(`${api_url}/auth/local`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        });

        const data = await response.json();

        if (response.status < 200 || response.status >= 300) {
            clearUserInfoFromLocalStorage(); 
            return rejectWithValue(data);
        }

        const result = (jwt ? {
            jwt, 
            user: data
        } : data) as UserPaylod;

        setupUserInfoToLocalStorage(result);

        return result;
        } catch (error) {
            clearUserInfoFromLocalStorage();
            return rejectWithValue(error);
        }
    }
);

export const logout = createAsyncThunk("user/logout", async () => clearUserInfoFromLocalStorage());

export const registration = createAsyncThunk<UserPaylod, RegistrationData>(
    "user/registration", 
    async(data, { rejectWithValue }) => {
        try {
            const response = await fetch(`${api_url}/auth/local/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.status < 200 || response.status >= 300) {
                return rejectWithValue(result);
            }

            setupUserInfoToLocalStorage(result);
            return(result);
        } catch(error) {
            return rejectWithValue(error);
        }
    }
);