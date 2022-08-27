import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    posts: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
};

export const getPosts = createAsyncThunk("post/getPosts", async (thunkAPI) => {
    try {
        return await postService.getPosts();
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const createPost = createAsyncThunk("post/createPost", async (data, thunkAPI) => {
    try {
        const token = user.token;
        return await postService.createPost(data, token);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }   
});

export const deletePost = createAsyncThunk("post/deletePost", async (id, thunkAPI) => {
    try {
        const token = user.token;
        return await postService.deletePost(id, token);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess =false;
            state.isError = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.posts = action.payload;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createPost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.posts = state.posts.push(action.payload);
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deletePost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.posts = state.posts.filter((post) => post.id !== action.payload.id)
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export const { reset } = postSlice.actions;

export default postSlice.reducer;