import { request } from 'express';
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

export default function PlaceOrderScreen(props) {
    const cart = useSelector((state )=> state.cart);
    if(!cart.agreeMethod){
        props.history.push('/confirm');
    }
    const orderCreate = useSelector((state) => state.orderCreate);
    const {loading, success,error,order} = orderCreate;
    const dispatch = useDispatch();
    const placeOrderHandler = () =>{
        dispatch(createOrder({...cart, orderItems: cart.cartItems}));
    };
    useEffect(() => {
        if(success){
            props.history.push(`/request/${order._id}`);
            dispatch({type: ORDER_CREATE_RESET});
        }
    },[dispatch,success,order,props.history]);
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Your information</h2>
                                <p>
                                    <strong>Name:</strong> {cart.shippingAddress.fullName} <br/>
                                    <strong>Address:</strong>{cart.shippingAddress.address},
                                    {cart.shippingAddress.city},{cart.shippingAddress.pinCode},{cart.shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Requested Items</h2>
                                <ul>
                                {
                                    cart.cartItems.map((item) => (
                                    <li key={item.product}>
                                        <div class= "row">
                                        <div>
                                            <img src={item.image} alt={item.name} className="small"/>
                                        </div>
                                        <div className="min-30">
                                            {item.qty} X <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div>
                                            <b>Address:</b><br/>
                                            {item.address}
                                        </div>
                                        </div>
                                    </li>
                                    ))
                                }
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Summary</h2>
                            </li>
                            <li>
                                <div class="row">
                                    <div>Items </div>
                                    <div>{cart.cartItems.reduce((a,c) => a+c.qty, 0)}</div>
                                </div>
                            </li>
                            <li>
                                <button type="button" onClick={placeOrderHandler} className="primary block"
                                disabled={cart.cartItems.length === 0}>Request</button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox varient="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
