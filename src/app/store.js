import filterReducer from '../conponents/common/filterSlice';

import { configureStore } from '@reduxjs/toolkit';

// state to use with useSelector
const rootReducer = {
    filter: filterReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
