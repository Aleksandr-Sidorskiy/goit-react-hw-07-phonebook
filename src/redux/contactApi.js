import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactApi = createApi({
    reducerPath: 'contactApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://62fce973b9e38585cd48c6ff.mockapi.io/contacts/'
    }),
    tagTypes:['Contact'],
    endpoints: (builder) => ({
        
        fechContact: builder.query({
            query: () => `/contacts`,
            providesTags:['Contact']
        }),
        
        createContact: builder.mutation({
            query: newContact => ({
                url: '/contacts',
                method: 'POST',
                body: newContact,
            }),
            invalidatesTags:['Contact'],
        }),
        

        deleteContact: builder.mutation({
            query: (id) => ({
                url: `contacts/${id}`,
                method: 'DELETE',
            }),

            invalidatesTags:['Contact'],
        }),
    
    }),
});

export const {
    useFechContactQuery,
    useDeleteContactMutation,
    useCreateContactMutation
} = contactApi;
