/* eslint-disable @typescript-eslint/ban-types */

import { useEffect, useState } from 'react'
import './App.css'
import Admin from './pages/Admin'
import { api } from './api'
import { Product } from './interfaces/Product'
import { Route, Routes, useNavigate } from 'react-router-dom'
import ProductAdd from './pages/ProductAdd'
import ProductEdit from './pages/ProductEdit'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const nav = useNavigate()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await api.get('/products')
        console.log(data)
        setProducts(data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const handleRemove = async (id: string | number) => {
    try {
      if (confirm('Are you sure you want to remove')) {
        await api.delete(`/products/${id}`)
        const newData = products.filter((product) => product.id !== id)
        setProducts(newData)
        toast.success('Delete product successfully')
        console.log(newData)
      }
    } catch (error) {
      toast.error('An error occurred, please try again')
      console.log(error)
    }
  }

  const handleAdd = (data: Product) => {
    ;(async () => {
      try {
        const res = await api.post('/products', data)
        setProducts([...products, res.data])
        toast.success('Create product successfully')
        nav('/')
      } catch (error) {
        toast.error('An error occurred, please try again')
        console.log(error)
      }
    })()
  }

  const handleEdit = (data: Product) => {
    ;(async () => {
      try {
        await api.patch(`/products/${data.id}`, data)
        const newData = await api.get('/products')
        setProducts(newData.data)
        toast.success('Update product successfuly')
        nav('/')
      } catch (error) {
        toast.error('An error occurred, please try again')
        console.log(error)
      }
    })()
  }

  return (
    <>
      <div>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Admin products={products} remove={handleRemove} />}></Route>
          <Route path='/admin/product-add' element={<ProductAdd onAdd={handleAdd} />}></Route>
          <Route path='/admin/product-edit/:id' element={<ProductEdit onEdit={handleEdit} />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
