import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}

export const register = createAsyncThunk("user/register", async (data, thunkAPI) => {
    try {
        return await userService.register(data);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const login = createAsyncThunk("user/login", async (data, thunkAPI) => {
    try {
        return await userService.login(data);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const logout = createAsyncThunk("user/logout", async () => {
    await userService.logout();
});

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
    }
});

export const { reset } = userSlice.actions;

export default userSlice.reducer