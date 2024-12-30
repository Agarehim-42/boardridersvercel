import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({baseUrl: "/api/v1"}),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "/products"
        }),
        getProductDetails: builder.query({
            query: (id) => `/products/${id}`,
        })
    })
})
//default - kenara cixaran defaultda istediyimiz adi qoya bilerik
//const - named import or export

export const {useGetProductDetailsQuery, useGetProductsQuery} = productApi