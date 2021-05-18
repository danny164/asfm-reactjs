import { createSlice } from '@reduxjs/toolkit';

const totalSlice = createSlice({
    name: 'total',
    initialState: [],
    reducers: {
        updateTotal(state, action) {
            state = action.payload;
            return state;
        },
    },
});

const { actions, reducer } = totalSlice;
export const { updateTotal } = actions;
export default reducer;
