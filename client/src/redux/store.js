import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import { alertsSlice } from './alertsSlice';
import {userSlice} from './userSlice';
import {doctorSlice} from './doctorSlice';
import {doctorTimingSlice} from './doctorTimingSlice';

const rootReducer = combineReducers({
  alerts: alertsSlice.reducer,
  user: userSlice.reducer,
  doctor: doctorSlice.reducer,
  doctorTimings: doctorTimingSlice.reducer,
})

const store = configureStore({
  reducer: rootReducer
})

export default store;