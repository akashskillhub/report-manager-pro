import { createSlice } from "@reduxjs/toolkit";
import { continueWithGoogle, loginUser, logout, registerUser } from "../actions/publicActions";

const publicSlice = createSlice({
    name: "public",
    initialState: {
        login: JSON.parse(localStorage.getItem("info"))
    },
    reducers: {
        invalidate: (state, { payload }) => {
            payload.forEach(item => {
                state[item] = false
            })
        }
    },
    extraReducers: builder => builder
        .addCase(registerUser.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(registerUser.fulfilled, (state, { payload }) => {
            state.loading = false
            state.register = true
        })
        .addCase(registerUser.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
        .addCase(loginUser.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(loginUser.fulfilled, (state, { payload }) => {
            state.loading = false
            state.login = true
        })
        .addCase(loginUser.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })

        .addCase(continueWithGoogle.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(continueWithGoogle.fulfilled, (state, { payload }) => {
            state.loading = false
            state.login = payload
        })
        .addCase(continueWithGoogle.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })


        .addCase(logout.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(logout.fulfilled, (state, { payload }) => {
            state.loading = false
            state.login = false
        })
        .addCase(logout.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
})

export const { invalidate } = publicSlice.actions
export default publicSlice.reducer