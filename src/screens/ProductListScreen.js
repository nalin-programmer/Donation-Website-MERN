import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';

export default function ProductListScreen(props) {
    const productList =useSelector(state => state.productList);
    const {loading, error, products} = productList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts());
    },[dispatch]);
    const deleteHandler = () => {

    }
    return (
        <div>
            <div className="row">
            <h1>Requests</h1>
            <button type="button" className="primary"></button>
            </div>
            {
                loading ? <LoadingBox></LoadingBox>
                :
                error ? <MessageBox varient = "danger">{error}</MessageBox>
                :
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) =>(
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.address}</td>
                                <td>{product.catagory}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <button type="button" className="small"
                                    onClick={() => props.history.push(`/request/${product._id}/edit`)}>Edit</button>
                                    <button type="button" className="small"
                                    onClick={() => deleteHandler(product)}>Delete</button>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            }
        </div>
    )
}
