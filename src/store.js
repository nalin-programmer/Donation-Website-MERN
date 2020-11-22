import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { productDetailsReducer, productLisReducer } from './reducers/productReducers';

const initialState={};
const reducer = combineReducers({
    productList: productLisReducer,
    productDetails: productDetailsReducer
});
const composeEnahancer= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer, 
    initialState,
    composeEnahancer(applyMiddleware(thunk))
);

export default store;