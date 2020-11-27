import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SigninScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const submitHandler = (e) =>{
        e.preventDefault();
    }

    return (
        <div>
            <form className="form signin" onSubmit={submitHandler}>
                <div>
                    <center><h1>Sign In</h1></center>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="passwordl" placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit"> Sign In</button>
                </div>
                <div>
                    <label/>
                    <div>
                        Dont have an account? <Link to="/register">Create your account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
