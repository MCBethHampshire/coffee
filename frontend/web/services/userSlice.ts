import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
    jwt: string;
    username: string;
    email: string;
};

export type LoginData = {
    identifier?: string, 
    password?: string,
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
    reducers: {
        update: (state, { payload }: PayloadAction<Partial<UserState>>) => ({ 
            ...state, 
            ...payload,
        }),
        clear: () => initialState,
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