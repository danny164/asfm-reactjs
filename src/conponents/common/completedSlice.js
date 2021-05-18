import { createSlice } from '@reduxjs/toolkit';

const completedSlice = createSlice({
    name: 'completed',
    initialState: 0,
    reducers: {
        updateCompleted(state, action) {
            state = action.payload;
            return state;
        },
    },
});

const { actions, reducer } = completedSlice;
export const { updateCompleted } = actions;
export default reducer;
