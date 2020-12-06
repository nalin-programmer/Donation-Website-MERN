import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderScreen(props) {
    const orderId = props.match.params.id;console.log( "OrderScreen");
    const orderDetails = useSelector( (state) => state.orderDetails);
    const {order, loading, error} = orderDetails;
    
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("OrderScreen UseEffect")
        dispatch(detailsOrder(orderId));
    },[dispatch,orderId]);
    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) :(
        <div>
            <h1>Request {order._id}</h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Your information</h2>
                                <p>
                                    <strong>Name:</strong> {order.shippingAddress.fullName} <br/>
                                    <strong>Address:</strong>{order.shippingAddress.address},
                                    {order.shippingAddress.city},{order.shippingAddress.pinCode},{order.shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Requested Items</h2>
                                <ul>
                                {
                                    order.orderItems.map((item) => (
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
                                    <div>{order.orderItems.reduce((a,c) => a+c.qty, 0)}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
