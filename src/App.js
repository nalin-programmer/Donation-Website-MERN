import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AboutUsScreen from './screens/AboutUsScreen';
import CartScreen from './screens/CartScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
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
                                    <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                                </ul>
                            </div>
                            ) : (
                                <Link to="/signin">Sign In</Link>
                            )
                        }
                        
                    </div>
                </header>
                <main>
                <Route path="/aboutus" component={AboutUsScreen}/>
                <Route path='/wishlist/:id?' component={CartScreen}/>
                <Route path='/signin' component={SigninScreen}/>
                <Route path='/register' component={RegisterScreen}/>
                <Route path='/requesting' component={ShippingAddressScreen}/>
                <Route path='/confirm' component={ConfirmationScreen}/>
                <Route path='/' component={HomeScreen} exact/>
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
