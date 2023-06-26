import { getPathologyOrders } from "../actions/PathologyActions";

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
            });
    },
});

export const { pathologyReset } = pathologySlice.actions;
export default pathologySlice.reducer;