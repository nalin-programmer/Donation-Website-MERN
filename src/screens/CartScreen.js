import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartAction';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () =>{
    props.history.push('/signin?redirect=requesting');
  };
  return (
    <div className="row top">
      <div className="col-2">
        <h1>💫Wish List</h1>
        {
          cartItems.length ===0 ? 
          <MessageBox> Wishlist is empty. <NavLink to="/">Add things to Wishlist</NavLink></MessageBox> :
          (
            <ul>
              {
                cartItems.map((item) => (
                  <li key={item.product}>
                    <div class= "row">
                      <div>
                        <img src={item.image} alt={item.name} className="small"/>
                      </div>
                      <div className="min-30">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>
                      <div>
                        <select value={item.qty} onChange={(e) => dispatch(addToCart((item.product),Number(e.target.value)))}>
                        {
                            [...Array(item.countInStock).keys()].map(
                                (x) => (
                                    <option key={x+1} value={x+1} > {x+1}</option>
                                )
                            )
                        }
                        </select>
                      </div>
                      <div>
                        <b>Address:</b><br/>
                        {item.address}
                      </div>
                      <div>
                        <button tybe="button" onClick={() => removeFromCartHandler(item.product)}>Delete</button>
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
          )
        }
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              Total: {cartItems.reduce((a,c) => a+c.qty, 0)} items
            </li>
            <li>
              <button 
                type="button" 
                onClick={checkoutHandler} 
                className="primary block" 
                disabled={cartItems.length ===0}
              >Proceed to checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}