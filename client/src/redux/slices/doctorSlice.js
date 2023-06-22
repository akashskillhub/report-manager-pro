import { createSlice } from "@reduxjs/toolkit";
import { doctorAddTest, doctorGetAllTests, getDoctorOrders, updateDoctorProfile } from "../actions/doctorActions";

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

        .addCase(doctorAddTest.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(doctorAddTest.fulfilled, (state, { payload }) => {
            state.loading = false
            state.addTest = true
        })
        .addCase(doctorAddTest.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })

        .addCase(getDoctorOrders.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(getDoctorOrders.fulfilled, (state, { payload }) => {
            state.loading = false
            state.orders = payload
        })
        .addCase(getDoctorOrders.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
})

export const { invalidate } = doctorSlice.actions
export default doctorSlice.reducer