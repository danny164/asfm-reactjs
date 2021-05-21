import { createSlice } from '@reduxjs/toolkit';

const progressSlice = createSlice({
    name: 'progress',
    initialState: 0,
    reducers: {
        updateProgress(state, action) {
            state = action.payload;
            return state;
        },
    },
});

const { actions, reducer } = progressSlice;
export const { updateProgress } = actions;
export default reducer;
