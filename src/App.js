import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import AboutUsScreen from './screens/AboutUsScreen';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
function App(){
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
  return(
    <BrowserRouter>
    <div className="grid-container">
            <header className="row">
                <div>
                {/* <a className="brand" href="/"><img src={Logo} style={{maxWidth: '30px', maxHeight: '30px'}}alt="Logo" /></a> */}
                    <Link className="brand" to="/">Sahayata</Link>
                </div>
                <div>
                    <Link to="/wishlist">Wishlist
                    {cartItems.length > 0 && (
                        <span className="badge">{cartItems.length}</span>
                    )}</Link>
                    <Link to="/aboutus">About Us</Link>
                    <Link to="/signin">Sign In</Link>
                </div>
            </header>
            <main>
            <Route path="/aboutus" component={AboutUsScreen}/>
            <Route path='/wishlist/:id?' component={CartScreen}/>
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
