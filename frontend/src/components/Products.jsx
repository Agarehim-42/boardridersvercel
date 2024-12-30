import React, { useEffect } from 'react'
import ProductCard from './ProductCard'
import { useGetProductsQuery } from '../redux/api/productsApi'
import { toast } from 'react-hot-toast'

const Products = () => {
  // RTK Query
  //isLoading yaradilsin skeleton

  const { data,  error, isError } = useGetProductsQuery()
  // Dependencies array , asilliqlar massivi bos saxliyanda 
  useEffect(() => {
    if (isError) {
      //data backendden xeta ile elaqeder melumatlari getirir .
      toast.error(error?.data?.message)
    }
  }, [isError])



  
  return (

    <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container my-[50px] mx-auto gap-5'>

{
  data?.products?.map((product) => (
    <ProductCard mehsul={product}/>
  ))
}
      <ProductCard />
    </div>
  )
}

export default Products