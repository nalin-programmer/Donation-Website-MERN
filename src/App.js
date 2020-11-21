import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
function App(){
  return(
    <BrowserRouter>
    <div className="grid-container">
            <header className="row">
                <div>
                {/* <a className="brand" href="/"><img src={Logo} style={{maxWidth: '30px', maxHeight: '30px'}}alt="Logo" /></a> */}
                    <a className="brand" href="/">Sahayata</a>
                </div>
                <div>
                    <a href="/cart">Cart</a>
                    <a href="/aboutus">About Us</a>
                    <a href="/signin">Sign In</a>
                </div>
            </header>
            <main>
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
