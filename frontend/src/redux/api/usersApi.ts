import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
   reducerPath: "usersApi",
   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4444" }),
   endpoints: (builder) => ({
      registerUser: builder.mutation({
         query: (body) => ({
            url: `/register`,
            method: "POST",
            body: body
         })
      }),
      authUser: builder.mutation({
         query: (body) => ({
            url: `/auth`,
            method: "POST",
            body: body
         })
      })
   }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useRegisterUserMutation, useAuthUserMutation} = usersApi;
