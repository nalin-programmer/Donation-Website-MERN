import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
    const userRegister = useSelector((state) => state.userRegister);
    const {userInfo, loading,error} = userRegister;

    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        // console.log(email+" "+password);
        if(password !== confirmPassword){
            alert('Password and confirm password dose not match.');
        }else{
            dispatch(register(name, email, address, password));
        }
    }

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
    },[props.history,redirect,userInfo]);

    return (
        <div>
            <form className="form signin" onSubmit={submitHandler}>
                <div>
                    <center><h1>Create Account</h1></center>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox varient="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Enter Name" required onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" placeholder="Enter Address" required onChange={(e) => setAddress(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" placeholder="Re-enter Password" required onChange={(e) => setConfirmPassword(e.target.value)}></input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit"> Register</button>
                </div>
                <div>
                    <label/>
                    <div>
                        Already have an account? <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
