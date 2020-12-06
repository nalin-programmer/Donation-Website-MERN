import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderHistoryScreens(props) {
    const orderMineList = useSelector((state) => state.orderMineList);
    const {loading, error, orders } = orderMineList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrderMine());
    },[dispatch]);
    return (
        <div>
            <h1>Request History</h1>
            { loading ? (<LoadingBox></LoadingBox>) :
            error ? (<MessageBox varient="danger">{error}</MessageBox>):
            (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>ACCEPTED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>{order.isDelivered ? order.deletedAt.substring(0,10) : 'No'}</td>
                                <td>
                                    <button type="button" className="small" 
                                    onClick = {() => {props.history.push(`/request/${orders._id}`)}}>Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
