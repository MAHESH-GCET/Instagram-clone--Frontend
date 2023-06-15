import {configureStore} from '@reduxjs/toolkit';
import loginSlice from './slices/loginSlice';

// create store
export const store = configureStore({
    reducer:{
        login:loginSlice
    }
})