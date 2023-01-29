import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const url = process.env.REACT_APP_API;
const url = "http://localhost:4005";

export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async () => {
        const response = await axios.get(`${url}/users`);
        return response.data;
    }
);

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (id) => {
        const response = await axios.get(`${url}/users/${id}`);
        return response.data;
    }
)

export const createUser = createAsyncThunk(
    'user/createUser',
    async (data) => {
        await axios.post(`${url}/users`, data);
    }
)

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (data) => {
       const response = await axios.patch(`${url}/users/${data.id}`,data)
       return response.data
    }
);

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (id) => {
        const response = await axios.delete(`${url}/users/${id}`);
        return response.data
    }
)

export const searchUser = createAsyncThunk(
    'user/searchUser',
    async (string) => {
        const response = await axios.get(`${url}/users?q=${string}`);
        return response.data;
    }
)

export const userSlice = createSlice({
    name : "user",
    initialState : {
        editUser : {},
        users : [],
        loading : false,
        error : ""
    },
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
            state.error = "";
        });

        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.users = [];
            state.error = action.error.message;
        })

        builder.addCase(createUser.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(createUser.fulfilled, (state) => {
            state.loading = false;
        });

        builder.addCase(createUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.editUser = action.payload;
            state.loading = false;
            
        });

        builder.addCase(fetchUser.rejected, (state, action) => {
            state.editUser = [];
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(updateUser.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(updateUser.fulfilled, (state, action) => {
            console.log(action.payload)
            state.loading = false
            state.error = ""
        });

        builder.addCase(updateUser.rejected, (state, action) => {
            state.users = [];
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(deleteUser.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
        });

        builder.addCase(deleteUser.rejected, (state, action) => {
            state.users = [];
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(searchUser.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(searchUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
            state.error = "";
        });

        builder.addCase(searchUser.rejected, (state, action) => {
            state.loading = false;
            state.users = [];
            state.error = action.error.message;
        })
    }
})

export default userSlice.reducer;