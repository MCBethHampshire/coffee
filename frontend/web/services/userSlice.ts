import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { RootState } from "../store";

type RequestState = "pending" | "fulfilled" | "rejected";

export type UserState = {
    jwt: string;
    username: string;
    email: string;
    userType?: string;
    requestState?: RequestState;
    error?: SerializedError;
};

export type LoginData = {
    identifier: string, 
    password: string,
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
        userType: string;
    }};

export const initialState: UserState = {
    jwt: "",
    username: "",
    email: "",
    userType: "",
};

export const selectUser = ({ user }: RootState) => user;

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      // Logout flow
      builder.addCase(logout.fulfilled, () => initialState);
  
      /** Login/registration flow */
      builder
        .addMatcher<PayloadAction<UserPaylod>>(
          (action) => /\/(login|registration)\/fulfilled$/.test(action.type),
          (state, { payload }) => {
            state.requestState = "fulfilled";
            state.jwt = payload.jwt;
            state.username = payload.user.username;
            state.email = payload.user.email;
            state.userType = payload.user.userType;
            state.error = undefined;
          }
        )
        .addMatcher(
          (action) => action.type.endsWith("/pending"),
          (state) => {
            state.requestState = "pending";
          }
        )
        .addMatcher(
          (action) => action.type.endsWith("/rejected"),
          (state, { payload }) => {
            const payloadError = (payload as { error: SerializedError })?.error;
            state.error = payloadError;
            state.requestState = "rejected";
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
    localStorage.removeItem("role");
};

const setupUserInfoToLocalStorage = (result: UserPaylod) => {
    localStorage.setItem("jwt", result.jwt);
    localStorage.setItem("username", result?.user?.username);
    localStorage.setItem("email", result?.user?.email);
    localStorage.setItem("role", result?.user?.userType)
};

const createRequest = ( jwt: string | null, loginData: LoginData | undefined) => {
    if (jwt && !loginData) {
        return fetch(`${api_url}/users/me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
    }
    if (loginData) {
        return fetch(`${api_url}/auth/local`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        });
    }
    throw { error: "Invalid login request"};
};

export const login = createAsyncThunk<UserPaylod, LoginData | undefined>(
    "user/login",
    async (loginData, {rejectWithValue}) => {
        try {
            const jwt = localStorage.getItem("jwt");

        const response = await createRequest(jwt, loginData);

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