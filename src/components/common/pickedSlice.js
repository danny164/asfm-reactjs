import { createSlice } from '@reduxjs/toolkit';

const pickedSlice = createSlice({
    name: 'picked',
    initialState: 0,
    reducers: {
        updatePicked(state, action) {
            state = action.payload;
            return state;
        },
    },
});

const { actions, reducer } = pickedSlice;
export const { updatePicked } = actions;
export default reducer;
