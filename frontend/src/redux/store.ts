import { configureStore } from '@reduxjs/toolkit'
import authUserReducer from './slices/authUserSlice'

import { setupListeners } from '@reduxjs/toolkit/query'
import { usersApi } from './api/usersApi'

export const store = configureStore({
  reducer: {
    isAuthUser: authUserReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
})

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch