import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

export default function ProductListScreen(props) {
    const productList =useSelector(state => state.productList);
    const {loading, error, products} = productList;
    const productCreate = useSelector(state => state.productCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate;
    const dispatch = useDispatch();
    useEffect(() => {
        if(successCreate){
            dispatch({ type: PRODUCT_CREATE_RESET});
            props.history.push(`/product/${createProduct._id}/edit`);
        }
        dispatch(listProducts());
    },[dispatch,createProduct,props.history, successCreate]);

    const deleteHandler = () => {
    }
    const createHandler = () => {
        dispatch(createProduct());
    }

    return (
        <div>
            <div className="row">
            <h1>Requests</h1>
            <button type="button" className="primary" 
            onClick = {createHandler}>Create Donation</button>
            </div>
            {loadingCreate && <LoadingBox></LoadingBox>}
            {errorCreate && <MessageBox varient = "danger">{errorCreate}</MessageBox>}

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
                                    onClick={() => props.history.push(`/product/${product._id}/edit`)}>Edit</button>
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
