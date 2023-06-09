import { createSlice } from "@reduxjs/toolkit";
import { addTest, adminAddPathology, adminDeleteOrder, adminGetAllOrders, adminGetAllPathology, adminUpdateOrder, getAllTests, testDelete, testUpdate } from "../actions/adminActions";

const adminSlice = createSlice({
    name: "admin",
    initialState: {},
    reducers: {
        adminReset: (state, { payload }) => {
            payload.forEach(item => {
                state[item] = false
            })
        }
    },
    extraReducers: builder => builder
        .addCase(addTest.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(addTest.fulfilled, (state, { payload }) => {
            state.loading = false
            state.testCreate = true
        })
        .addCase(addTest.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })

        .addCase(testUpdate.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(testUpdate.fulfilled, (state, { payload }) => {
            state.loading = false
            state.testUpdate = true
        })
        .addCase(testUpdate.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
        .addCase(testDelete.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(testDelete.fulfilled, (state, { payload }) => {
            state.loading = false
            state.testDelete = true
        })
        .addCase(testDelete.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
        .addCase(getAllTests.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(getAllTests.fulfilled, (state, { payload }) => {
            state.loading = false
            state.tests = payload
        })
        .addCase(getAllTests.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })


        .addCase(adminGetAllOrders.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(adminGetAllOrders.fulfilled, (state, { payload }) => {
            state.loading = false
            state.orders = payload
        })
        .addCase(adminGetAllOrders.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })


        .addCase(adminDeleteOrder.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(adminDeleteOrder.fulfilled, (state, { payload }) => {
            state.loading = false
            state.orderDeleted = true
        })
        .addCase(adminDeleteOrder.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })


        .addCase(adminUpdateOrder.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(adminUpdateOrder.fulfilled, (state, { payload }) => {
            state.loading = false
            state.orderUpdated = true
        })
        .addCase(adminUpdateOrder.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })

        .addCase(adminGetAllPathology.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(adminGetAllPathology.fulfilled, (state, { payload }) => {
            state.loading = false
            state.pathologies = payload
        })
        .addCase(adminGetAllPathology.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })

        .addCase(adminAddPathology.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(adminAddPathology.fulfilled, (state, { payload }) => {
            state.loading = false
            state.pathologyAdded = true
        })
        .addCase(adminAddPathology.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
})

export const { adminReset } = adminSlice.actions
export default adminSlice.reducer