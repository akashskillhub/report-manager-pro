import { createSlice } from "@reduxjs/toolkit";
import { doctorGetAllTests, updateDoctorProfile } from "../actions/doctorActions";

const doctorSlice = createSlice({
    name: "doctor",
    initialState: {},
    reducers: {
        invalidate: (state, { payload }) => {
            payload.forEach(item => {
                state[item] = false
            })
        }
    },
    extraReducers: builder => builder
        .addCase(updateDoctorProfile.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(updateDoctorProfile.fulfilled, (state, { payload }) => {
            state.loading = false
            state.update = true
        })
        .addCase(updateDoctorProfile.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })

        .addCase(doctorGetAllTests.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(doctorGetAllTests.fulfilled, (state, { payload }) => {
            state.loading = false
            state.allTests = payload
        })
        .addCase(doctorGetAllTests.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
})

export const { invalidate } = doctorSlice.actions
export default doctorSlice.reducer