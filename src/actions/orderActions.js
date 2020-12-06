import Axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_PAY_FAIL, ORDER_DETAILS_SUCCESS, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../constants/orderConstants"

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({type: ORDER_CREATE_REQUEST, payload: order});
    try{
        const {userSignin: { userInfo}} = getState();
        const {data} = await Axios.post('https://sahayata-mern-stack.herokuapp.com/api/requests',order,{
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({type: ORDER_CREATE_SUCCESS, payload: data.order});
        dispatch({type: CART_EMPTY});
        localStorage.removeItem("cartItems");
    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: message,
        });
    }
};

export const detailsOrder = (orderId) => async (dispatch, getState) =>{
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId});
    const {userSignin: {userInfo},} = getState();
    try{
        const {data} = await Axios.get(`https://sahayata-mern-stack.herokuapp.com/api/requests/${orderId}`,{
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch( { type: ORDER_DETAILS_SUCCESS, payload: data });
    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: ORDER_DETAILS_FAIL, payload: message});
    }
};
export const payOrder = (order) => (dispatch, getState) =>{
    dispatch({type:  ORDER_PAY_REQUEST });
    const { userSignin: { userinfo}, } = getState();
    try{
        // const {data} = Axios.put(`/api/requests/${order._id}/request`)
        dispatch({type: ORDER_PAY_SUCCESS});
    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: message,
        });
    }
}