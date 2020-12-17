import Axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_AGREE_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) =>{
    const {data} = await Axios.get(`https://sahayata-mern-stack.herokuapp.com/api/products/${productId}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name: data.name,
            image: data.image,
            address: data.address,
            countInStock: data.countInStock,
            product: data._id,
            qty,
        },
    });
    // console.log(data.name);
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) =>{
    dispatch({type: CART_REMOVE_ITEM,payload: productId});
    localStorage.setItem('cartItems',JSON.stringify(getState().cartItems));
};

export const saveShippingAddress = (data) => (dispatch) =>{
    dispatch({type: CART_SAVE_SHIPPING_ADDRESS, payload: data});
    localStorage.setItem('shippingAddress', JSON.stringify(data));
}
export const saveAgreeMethod = (data) => (dispatch) =>{
    dispatch({type: CART_SAVE_AGREE_METHOD, payload: data});
}