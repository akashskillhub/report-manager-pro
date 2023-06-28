import { PathologyAcceptOrderAction, PathologyReportUploadAction, getPathologyOrders } from "../actions/PathologyActions";

import { createSlice } from "@reduxjs/toolkit";

const pathologySlice = createSlice({
    name: "pathology",
    initialState: {},
    reducers: {
        pathologyReset: (state, { payload }) => {
            payload.forEach((item) => {
                state[item] = false;
            });
        },
    },
    extraReducers: (builder) => {
        builder
            // tests
            .addCase(getPathologyOrders.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(getPathologyOrders.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.orders = payload;
            })
            .addCase(getPathologyOrders.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })

            .addCase(PathologyAcceptOrderAction.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(PathologyAcceptOrderAction.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.accept = true;
            })
            .addCase(PathologyAcceptOrderAction.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })


            .addCase(PathologyReportUploadAction.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(PathologyReportUploadAction.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.reportUpload = true;
            })
            .addCase(PathologyReportUploadAction.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
    },
});

export const { pathologyReset } = pathologySlice.actions;
export default pathologySlice.reducer;