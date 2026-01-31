import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import feedSlice from './feedSlice';
import requestSlice from './requestSlice';
import friendsSlice from './friendsSlice';
import blockSlice from './blockSlice';

const appStore = configureStore({
  reducer: {
    user: userSlice,
    feed: feedSlice,
    request: requestSlice,
    friend: friendsSlice,
    block: blockSlice
  },
})
export default appStore;