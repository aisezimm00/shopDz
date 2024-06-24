
import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import './style.css'
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { addCart } from '../../redux/reducer';
import { useDispatch } from 'react-redux';

export default function CategoryComponent({category,limit}) {
    const [productList, setProductList] = useState([])


    const dispatch = useDispatch()


    useEffect(() => {
       axios(
        limit
        ? `https://fakestoreapi.com/products/category/${category}?limit=${limit}`
        : `https://fakestoreapi.com/products/category/${category}`
       ).then(({data}) => {
        setProductList(data)
       })
    }, [category])
  return (
    <div>
        <h1 className='categoryName'>{category}</h1>
        <div className="row">
        {productList.map((item) => {
          return (
            <div key={item.id} className="col-4">
              <div className="product-card">
                 <Link to={`/product/${item.id}`}>
                 <img src={item.image} className='product-card-img' alt="" />
                 </Link>
                 <Link to={`/product/${item.id}`}>
                 <h4 className="product-card-title">{item.title.length > 30
                    ? item.title.substr(0, 27).trim() 
                : item.title}</h4>
                <p className="product-card-text">{item.description.length > 40
                    ? item.description.substr(0,37) 
                : item.description}</p>                 </Link>
                
                <div className="product-card-bottom">
                  <p className="product-card-price">Цена: ${item.price}</p>
                  <button className="product-card-btn" onClick={() => {
                    dispatch(addCart(item))
                  }}><FaShoppingCart className='cart-icon' />Buy</button>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}
