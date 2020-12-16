import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer, orderDeleteReducer, orderDetailsReducer, orderListReducer, orderMineReducer, orderPayReducer } from './reducers/orderReducer';
import { productCreateReducer, productDeleteReducer, productDetailsReducer, productLisReducer, productUpdateReducer } from './reducers/productReducers';
import { userDetailsReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer } from './reducers/userReducer';

const initialState={
    userSignin: {
        userInfo: localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')):null,
    },
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')):[],
        shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')):{},
        agreeMethod: 'agree',
    },
};
const reducer = combineReducers({
    productList: productLisReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
});
const composeEnahancer= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer, 
    initialState,
    composeEnahancer(applyMiddleware(thunk))
);

export default store;