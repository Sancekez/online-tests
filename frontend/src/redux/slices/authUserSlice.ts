import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
   auth: boolean
 }

const initialState : AuthState = {
   auth: false,
 }

export const authUserSlice = createSlice({
   name: "authUser",
   initialState,
   reducers: {
      setAuthUser: (state, action: PayloadAction<boolean>) => {
         state.auth = action.payload
      },
   },
});

// Action creators are generated for each case reducer function
export const { setAuthUser } = authUserSlice.actions;

export default authUserSlice.reducer;
