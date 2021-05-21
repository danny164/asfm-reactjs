import { configureStore } from '@reduxjs/toolkit';
import cancelledReducer from '../components/common/cancelledSlice';
import completedReducer from '../components/common/completedSlice';
import filterReducer from '../components/common/filterSlice';
import pickedReducer from '../components/common/pickedSlice';
import progressReducer from '../components/common/progressSlice';
import totalReducer from '../components/common/totalSlice';
import notificationReducer from '../views/web/Slice/notificationSlice';

// state to use with useSelector
const rootReducer = {
    filter: filterReducer,
    notification: notificationReducer,
    total: totalReducer,
    progress: progressReducer,
    picked: pickedReducer,
    completed: completedReducer,
    cancelled: cancelledReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
