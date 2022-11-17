import axios from 'axios'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import Layout from '../components/Layout'
import ProductItem from '../components/ProductItem'
import Product from '../models/Product'
// import data from '../utils/data'
import db from '../utils/db'
import { Store } from '../utils/Store'

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store)
  const { cart } = state

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug)
    const quantity = existItem ? existItem.quantity + 1 : 1

    const { data } = await axios.get(`/api/products/${product._id}`)

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock. 상품이 부족합니다.')
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })

    toast.success('Product added to the cart')
  }

  return (
    <Layout title="Home">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 z-10">
        {products.map((product) => (
          <ProductItem
            product={product}
            addToCartHandler={addToCartHandler}
            key={product.slug}
          />
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  await db.connect()
  const products = await Product.find().lean()
  await db.disconnect()
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  }
}
