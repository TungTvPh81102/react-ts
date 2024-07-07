import { SubmitHandler, useForm } from 'react-hook-form'
import { Product } from '../interfaces/Product'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema } from '../validation/product'

type Props = {
  onAdd: (data: Product) => void
}

const ProductAdd = ({ onAdd }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Product>({
    resolver: zodResolver(productSchema)
  })
  const onSubmit: SubmitHandler<Product> = (data) => {
    console.log(data)
    onAdd(data)
  }

  return (
    <div>
      <h1 className='fs-2 fw-bold'>Add product</h1>
      <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3'>
          <label className='form-label'>Title</label>
          <input
            type='text'
            placeholder='Enter title...'
            className='form-control'
            {...register('title', { required: true })}
          />
          {errors.title && <p className='text-danger mt-3'>{errors.title.message}</p>}
        </div>
        <div className='mb-3'>
          <label className='form-label'>Price</label>
          <input
            type='text'
            placeholder='Enter price...'
            className='form-control'
            {...register('price', { valueAsNumber: true, required: true })}
          />
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
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default ProductAdd

// import { SubmitHandler, useForm } from 'react-hook-form'
// import { Product } from '../interfaces/Product'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { productSchema } from '../validation/product'
// import { Link } from 'react-router-dom'
// import { uploadToCloudinary } from '../api'
// import { useState } from 'react'

// type Props = {
//   onAdd: (data: Product) => void
// }

// const ProductAdd = ({ onAdd }: Props) => {
//   const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm<Product>({
//     resolver: zodResolver(productSchema)
//   })
//   const onSubmit: SubmitHandler<Product> = async (data) => {
//     try {
//       let thumbnailUrl = ''
//       if (thumbnailFile) {
//         thumbnailUrl = await uploadToCloudinary(thumbnailFile)
//       }
//       const productData = { ...data, thumbnail: thumbnailUrl }
//       onAdd(productData)
//     } catch (error) {
//       console.error('Error adding product:', error)
//     }
//   }

//   return (
//     <div>
//       <h1 className='fs-2 fw-bold mt-4'>Add product</h1>
//       <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
//         <div className='mb-3'>
//           <label className='form-label'>Title</label>
//           <input
//             type='text'
//             placeholder='Enter title...'
//             className='form-control'
//             {...register('title', { required: true })}
//           />
//           {errors.title && <p className='text-danger mt-3'>{errors.title.message}</p>}
//         </div>
//         <div className='mb-3'>
//           <label className='form-label'>Price</label>
//           <input
//             type='text'
//             placeholder='Enter price...'
//             className='form-control'
//             {...register('price', { valueAsNumber: true, required: true })}
//           />
//           {errors.price && <p className='text-danger mt-3'>{errors.price.message}</p>}
//         </div>
//         <div className='mb-3'>
//           <label className='form-label'>Thumbnail</label>
//           <input
//             type='file'
//             className='form-control'
//             onChange={(e) => setThumbnailFile(e.target.files ? e.target.files[0] : null)}
//           />
//           {errors.thumbnail && <p className='text-danger mt-3'>{errors.thumbnail.message}</p>}
//         </div>
//         <div className='mb-3'>
//           <label className='form-label'>Description</label>
//           <textarea
//             className='form-control'
//             placeholder='Enter description...'
//             id=''
//             {...register('description')}
//           ></textarea>
//           {errors.description && <p className='text-danger mt-3'>{errors.description.message}</p>}
//         </div>
//         <button type='submit' className='btn btn-primary me-2'>
//           Submit
//         </button>
//         <Link to='/' className='btn btn-secondary '>
//           Back to list
//         </Link>
//       </form>
//     </div>
//   )
// }

// export default ProductAdd
