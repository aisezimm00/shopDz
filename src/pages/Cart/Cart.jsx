import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCart, deleteCart, decrementCart } from '../../redux/reducer';
import { MdDelete } from "react-icons/md";
import './style.css';
import Preloader from '../../components/Preloader/Preloader'; // Adjust the path as per your project structure

export default function Cart() {
  const [loading, setLoading] = useState(true);
  const cartList = useSelector(state => state.reducer.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      savedCart.forEach(item => {
        dispatch(addCart(item));
      });
    }
    setLoading(false); // Set loading to false once cart items are loaded
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartList));
  }, [cartList]);

  if (loading) {
    return <Preloader />; // Show preloader while loading cart items
  }

  return (
    <div className='container cart'>
      <p>Total: <b>${cartList.reduce((acc, rec) => acc + (rec.price * rec.count), 0).toFixed(2)}</b></p>

      {cartList.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        cartList.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-left">
              <img className='cart-img' src={item.image} alt={item.title} />
              <div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
            <div className="cart-item-right">
            <div className="cart-count">
                <button
                  onClick={() => dispatch(addCart(item))}
                  className='cart-count-btn'>
                  +
                </button>
                <span>{item.count}</span>
                <button
                  onClick={() => dispatch(decrementCart(item))}
                  className='cart-count-btn'>
                  -
                </button>
              </div>
              <p className='cart-item-price'>${(item.price * item.count).toFixed(2)}</p>
              <button
                className="cart-delete-btn"
                onClick={() => dispatch(deleteCart(item))}
              >
                <MdDelete className='delete-icon' />delete
              </button>
            </div>
            <br /><br />
            <hr />
          </div>
        ))
      )}
    </div>
  );
}
