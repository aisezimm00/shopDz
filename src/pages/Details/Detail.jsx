import { useEffect, useState } from 'react'
import './detail.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { RiArrowGoBackLine } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addCart } from '../../redux/reducer';


export default function Detail() {
  const params = useParams()
  const [product,setProduct]  = useState({})
  const navigate = useNavigate()

  const dispatch = useDispatch()

  useEffect(() => {
    axios(`https://fakestoreapi.com/products/${params.id}`)
    .then(({data}) => {
      setProduct(data)
    })
  }, [])
  return (
    <div className='container-detail'>
      {
        JSON.stringify(product) === '{}'
        ? ""
        : <div className="row">
          <div className="col-6">
            <img src={product.image} className='detail-img' alt="" />
          </div>
          <div className="col-6 text">
            <h2 className='detail-title'>{product.title}</h2>
            <p className='deatil-text'>{product.description}</p>
            <hr />
            <p className="detail-text"><b>Category :</b> {product.category}</p>
            <p className="detail-text"><b>Rating :</b> {product.rating.rate}</p>
            <p className="detail-text price"><b>Price :</b> ${product.price}</p>
            <hr />
            <button onClick={() => {
              navigate(-1)
            }} className='details-btn'><RiArrowGoBackLine className='icons' />go back</button>
            <button onClick={() => {
              dispatch(addCart(product))
            }} className='details-btn'><FaShoppingCart className='icons' />add to cart</button>
          </div>
        </div>
      }
    </div>
  )
}
