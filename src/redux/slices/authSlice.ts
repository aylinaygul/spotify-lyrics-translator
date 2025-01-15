import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    authCode: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    authCode: null,
    accessToken: null,
    refreshToken: null,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess(
            state,
            action: PayloadAction<{ access_token: string; refresh_token: string }>
        ) {
            state.isLoading = false;
            state.accessToken = action.payload.access_token;
            state.refreshToken = action.payload.refresh_token;
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.accessToken = null;
            state.refreshToken = null;
            state.isLoading = false;
            state.error = null;
        },
        refreshStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        refreshSuccess(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.accessToken = action.payload;
        },
        refreshFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, refreshStart, refreshSuccess, refreshFailure, } = authSlice.actions;
export default authSlice.reducer;
