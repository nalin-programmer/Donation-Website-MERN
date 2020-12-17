import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser , updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {  USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [sellerName, setSellerName] = useState('');
    const [sellerLogo, setSellerLogo] = useState('');
    const [sellerDescription, setSellerDescription] = useState('');

    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;

    const userDetails = useSelector((state) => state.userDetails);
    const {loading,error,user}=userDetails;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const {success: successUpdate, error: errorUpdate, loading: loadingUpdate} = userUpdateProfile;

    const dispatch = useDispatch();

    useEffect(() =>{
        if(!user){
            dispatch({type: USER_UPDATE_PROFILE_RESET});
            dispatch(detailsUser(userInfo._id));
        }else{
            setName(user.name);
            setEmail(user.email);
            setAddress(user.address);
        }

        if (user.isSeller) {
            setSellerName(user.seller.name);
            setSellerLogo(user.seller.logo);
            setSellerDescription(user.seller.description);
        }

    },[dispatch,userInfo._id,user]);

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Password and confirm dose not match');
        }else{
            dispatch(updateUserProfile({
                userId: user._id,
                name,
                email,
                password,
                sellerName,
                sellerLogo,
                sellerDescription,
                })
            );
        }
    }

    return (
        <div>
            <form className="form profile" onSubmit={submitHandler}>
                {
                    loading ? <LoadingBox></LoadingBox>
                    :
                    error ? <MessageBox variant="danger">{error}</MessageBox>
                    :
                    <>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                    {successUpdate && <MessageBox variant="success">Profile Updated Successfully</MessageBox>}
                        <h1><center><h1>User Profile</h1></center></h1>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="address">Address</label>
                            <input id="address" type="text" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input id="email" type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input id="confirmPassword" type="password" placeholder="Re-enter Password" onChange={(e) => setConfirmPassword(e.target.value)}></input>
                        </div>
                        {user.isSeller && (
                            <>
                                <h2>Donar</h2>
                                <div>
                                <label htmlFor="sellerName">Donar Name</label>
                                <input
                                    id="sellerName"
                                    type="text"
                                    placeholder="Enter Donar Name"
                                    value={sellerName}
                                    onChange={(e) => setSellerName(e.target.value)}
                                ></input>
                                </div>
                                <div>
                                <label htmlFor="sellerLogo">Donar Logo</label>
                                <input
                                    id="sellerLogo"
                                    type="text"
                                    placeholder="Enter Donar Logo"
                                    value={sellerLogo}
                                    onChange={(e) => setSellerLogo(e.target.value)}
                                ></input>
                                </div>
                                <div>
                                <label htmlFor="sellerDescription">Donar Description</label>
                                <input
                                    id="sellerDescription"
                                    type="text"
                                    placeholder="Enter Donar Description"
                                    value={sellerDescription}
                                    onChange={(e) => setSellerDescription(e.target.value)}
                                ></input>
                                </div>
                            </>
                        )}
                        <div>
                            <label/>
                            <button className="primary" type="submit">Update</button>
                        </div>
                    </>
                }
            </form>
        </div>
    )
}
