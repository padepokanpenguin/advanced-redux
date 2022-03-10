import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './ui-slice';

const store = configureStore({
  reducers: { ui: uiSlice.reducer }
})

export default store;
