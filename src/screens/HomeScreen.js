import React, { useEffect } from 'react'
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
export default function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products} = productList;
    useEffect(() => {
        dispatch(listProducts({}));
    }, [dispatch]);
    return (
    <div>
        {loading ? (
            <LoadingBox></LoadingBox>
        ):error ? (
            <MessageBox varient="danger">{error}</MessageBox>
            ):(
            <div className="row center">
                {/* {console.log(products)} */}
                {products.map((product) =>(
                    <Product key={product._id} product={product}></Product>
                ))}
            </div>
        )}
        
    </div>
    )
}
