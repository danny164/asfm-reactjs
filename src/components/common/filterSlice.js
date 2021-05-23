import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'filter',
    initialState: 'all',
    reducers: {
        changeFilter(state, action) {
            state = action.payload;
            return state;
        },
    },
});

const { actions, reducer } = filterSlice;
export const { changeFilter } = actions;
export default reducer;
