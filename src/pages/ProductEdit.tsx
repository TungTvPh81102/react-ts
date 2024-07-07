import { SubmitHandler, useForm } from 'react-hook-form'
import { Product } from '../interfaces/Product'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema } from '../validation/product'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { api } from '../api'

type Props = {
  onEdit: (data: Product) => void
}

const ProductEdit = ({ onEdit }: Props) => {
  const { id } = useParams()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Product>({
    resolver: zodResolver(productSchema)
  })

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await api.get(`/products/${id}`)
        reset(data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [id, reset])
  const onSubmit: SubmitHandler<Product> = (data) => {
    console.log(data)
    onEdit({ ...data, id })
  }

  return (
    <div>
      <h1 className='fs-2 fw-bold mt-4'>Edit product</h1>
      <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3'>
          <label className='form-label'>Title</label>
          <input type='text' className='form-control' {...register('title', { required: true })} />
          {errors.title && <p className='text-danger mt-3'>{errors.title.message}</p>}
        </div>
        <div className='mb-3'>
          <label className='form-label'>Price</label>
          <input type='text' className='form-control' {...register('price', { valueAsNumber: true, required: true })} />
          {errors.price && <p className='text-danger mt-3'>{errors.price.message}</p>}
        </div>
        <div className='mb-3'>
          <label className='form-label'>Thumbnail</label>
          <input type='text' className='form-control' {...register('thumbnail', { required: true })} />
          {errors.thumbnail && <p className='text-danger mt-3'>{errors.thumbnail.message}</p>}
        </div>
        <div className='mb-3'>
          <label className='form-label'>Description</label>
          <textarea
            className='form-control'
            placeholder='Enter description...'
            id=''
            {...register('description')}
          ></textarea>
          {errors.description && <p className='text-danger mt-3'>{errors.description.message}</p>}
        </div>
        <button type='submit' className='btn btn-primary me-2'>
          Update
        </button>
        <Link to='/' className='btn btn-secondary '>
          Back to list
        </Link>
      </form>
    </div>
  )
}

export default ProductEdit
