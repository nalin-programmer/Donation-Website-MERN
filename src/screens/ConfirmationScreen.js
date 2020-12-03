import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveAgreeMethod } from '../actions/cartAction';
import CheckoutSteps from '../components/CheckoutSteps'

export default function ConfirmationScreen(props) {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    if(!shippingAddress.address){
        props.history.push('/requesting');
    }
    const [AgreeMethod, setAgreeMethod] = useState('agree');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveAgreeMethod(AgreeMethod));
        props.history.push("/placeorder");
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3>
            </CheckoutSteps>
                <form className="form yourInfromation" onSubmit={submitHandler}>
                    
                        <div><center><h1>Terms and Conditions</h1></center></div>
                        <div>
                            <p>
                            I hareby confirm that I am requesting the following thing for donation
                            because I am in need of it and not for any mal practicies of business.
                            On clicking on check box below I will assure doner that I am accepting the 
                            donation with full respect and because I am in need of it and can not buy it
                            from market because of financial problems.
                            </p>
                        </div>
                        <input type="checkbox" id="agree" value="agree" name="TermsAndCondition" required onClick={(e) => setAgreeMethod(e.target.value)}/>
                        <label htmlFor="agree">I Agree to Terms and Conditions</label>
                        <div>
                            <button className="primary" type="submit">Continue</button>
                        </div>
                </form>
        </div>
    )
}
