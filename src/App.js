import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import AboutUsScreen from './screens/AboutUsScreen';
import CartScreen from './screens/CartScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreens from './screens/OrderHistoryScreens';
import OrderScreen from './screens/OrderScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import OrderListScreen from './screens/OrderListScreen';
import SellerRoute from './components/SellerRoute';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
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
                        {userInfo && userInfo.isSeller && (
                        <div className="dropdown">
                            <Link to="#admin">
                            Donate <i className="fa fa-caret-down"></i>
                            </Link>
                            <ul className="dropdown-content">
                            <li>
                                <Link to="/productlist/donar">Donation</Link>
                            </li>
                            <li>
                                <Link to="/requestlist/donar">Requests</Link>
                            </li>
                            </ul>
                        </div>
                        )}
                        {
                            userInfo && userInfo.isAdmin && (
                                <div className="dropdown">
                                    <Link to="#admin">
                                        Admin <i className="fa fa-caret-down"></i>
                                    </Link>
                                    <ul className="dropdown-content">
                                        <li><Link to ="/dashboard">Dashboard</Link></li>
                                        <li><Link to ="/productlist">Donation</Link></li>
                                        <li><Link to ="/requestlist">Requests</Link></li>
                                        <li><Link to ="/userlist">Users</Link></li>
                                    </ul>

                                </div>
                            )
                        }
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
                <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
                <AdminRoute path="/productlist" component={ProductListScreen} exact/>
                <AdminRoute path="/requestlist"component={OrderListScreen} exact></AdminRoute>
                <AdminRoute path="/user/:id/edit"component={UserEditScreen}></AdminRoute>
                <SellerRoute path="/productlist/donar" component={ProductListScreen} exact></SellerRoute>
                <SellerRoute path="/requestlist/donar" component={OrderListScreen} exact></SellerRoute>
                <Route path='/' component={HomeScreen} exact/>
                <Route path='/confirm' component={ConfirmationScreen} exact/>
                <Route path='/request/:id' component={OrderScreen} />
                <Route path='/wishlist/:id?' component={CartScreen}/>
                <Route path='/product/:id' component={ProductScreen} exact/>
                <Route path="/product/:id/edit" component={ProductEditScreen} exact/>
                </main>
                <footer className="row center">
                    All right reserved
                </footer>
            </div>
        </BrowserRouter>
    );
}
export default App;
