import { createSlice } from '@reduxjs/toolkit';

const cancelledSlice = createSlice({
    name: 'cancelled',
    initialState: 0,
    reducers: {
        updateCancelled(state, action) {
            state = action.payload;
            return state;
        },
    },
});

const { actions, reducer } = cancelledSlice;
export const { updateCancelled } = actions;
export default reducer;
