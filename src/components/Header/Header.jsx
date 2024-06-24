import React from 'react';
import { Link } from 'react-router-dom';
import './geader.css';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
    const categories = useSelector((store) => store.reducer.categories);
    const cartItems = useSelector((store) => store.reducer.cart);

    // Calculate total number of items in the cart
    const totalItems = cartItems.reduce((total, item) => total + item.count, 0);

    return (
        <div>
            <header className='header'>
                <div className="container header-container">
                    <h1 className='header-logo'>
                        <Link to={'/'}>Shop</Link>
                    </h1>
                    <nav className='header-nav'>
                        {categories.map(item => (
                            <Link key={item} to={`/category/${item}`}>{item}</Link>
                        ))}
                    </nav>
                    <nav className='header-nav'>
                        <Link to={'/cart'} className='cart-link'>
                            <FaShoppingCart className='cart-header-icon' />
                            {totalItems > 0 && (
                                <span className='cart-count-red-dot'>
                                    {totalItems > 9 ? '9+' : totalItems}
                                </span>
                            )}
                            Cart
                        </Link>
                    </nav>
                </div>
            </header>
        </div>
    );
}
