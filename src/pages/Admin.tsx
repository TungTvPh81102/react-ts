import { Link } from 'react-router-dom'
import { Product } from '../interfaces/Product'
// import { useContext } from 'react'
// import { ProductContext } from '../contexts/ProductContext'
// import { useContext } from 'react'
// import { ProductContext } from '../contexts/ProductContext'

type Props = {
  products: Product[]
  remove: (id: number | string) => void
}

const Admin = ({ products, remove }: Props) => {
  // const { state } = useContext(ProductContext)

  // console.log(state.products)

  return (
    <div className='mt-4'>
      <div className='d-flex justify-content-between'>
        <h1 className='fs-2 fw-bold'>Dashboard</h1>
        <Link className='bg-primary text-white btn ' to='/admin/product-add'>
          Add product
        </Link>
      </div>
      <table className='table mt-4'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Title</th>
            <th scope='col'>Price</th>
            <th scope='col'>Thumbnail</th>
            <th scope='col'>Description</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>
                <img src={item.thumbnail} width='100' alt='' />
              </td>
              <td>{item.description}</td>
              <td className=''>
                <Link to={`/admin/product-edit/${item.id}`} className='btn btn-warning me-2'>
                  Edit
                </Link>
                <button onClick={() => remove(item.id!)} className='btn btn-danger'>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Admin
