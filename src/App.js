import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import PrivateRoute from './components/PrivateRoute';
import AboutUsScreen from './screens/AboutUsScreen';
import CartScreen from './screens/CartScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreens from './screens/OrderHistoryScreens';
import OrderScreen from './screens/OrderScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
function App(){
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;
    const dispatch = useDispatch();
    const signoutHandler = () =>{
        dispatch(signout());
    }
    return(
        <BrowserRouter>
        <div className="grid-container">
                <header className="row">
                    <div>
                    {/* <a className="brand" href="/"><img src={Logo} style={{maxWidth: '30px', maxHeight: '30px'}}alt="Logo" /></a> */}
                        <Link className="brand" to="/">Sahayata</Link>
                    </div>
                    <div>
                        <Link to="/aboutus">About Us</Link>
                        <Link to="/wishlist">Wishlist
                        {cartItems.length > 0 && (
                            <span className="badge">{cartItems.length}</span>
                        )}</Link>
                        
                        {
                            userInfo ? (
                            <div className="dropdown">
                                <Link to="#">{userInfo.name + " "}<i className="fa fa-caret-down"></i></Link>
                                <ul className="dropdown-content">
                                    <li><Link to='/profile'>User Profile</Link></li>
                                    <li><Link to='/requesthistory'>Req. History</Link></li>
                                    <li><Link to="#signout" onClick={signoutHandler}>Sign Out</Link></li>
                                </ul>
                            </div>
                            ) : (
                                <Link to="/signin">Sign In</Link>
                            )
                        }
                        
                    </div>
                </header>
                <main>
                <Route path='/requesthistory' component={OrderHistoryScreens} exact/>
                <Route path="/aboutus" component={AboutUsScreen} exact/>
                <Route path='/signin' component={SigninScreen} exact/>
                <Route path='/register' component={RegisterScreen} exact/>
                <Route path='/requesting' component={ShippingAddressScreen} exact/> 
                <Route path='/placeorder' component={PlaceOrderScreen} exact/>
                <PrivateRoute path="/profile" component={ProfileScreen}/>
                <Route path='/' component={HomeScreen} exact/>
                <Route path='/confirm' component={ConfirmationScreen} exact/>
                <Route path='/request/:id' component={OrderScreen} />
                <Route path='/wishlist/:id?' component={CartScreen}/>
                <Route path='/product/:id' component={ProductScreen}/>
                </main>
                <footer className="row center">
                    All right reserved
                </footer>
            </div>
        </BrowserRouter>
    );
}
export default App;
