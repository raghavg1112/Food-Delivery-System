import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import {useNavigate } from 'react-router-dom'

export default function Login() {
    const [input, setInput] = useState({ username: "", password: "" });
    const Navigate=useNavigate();
    const handleChange = (e) => {
        const newuser = { ...input };
        newuser[e.target.name] = e.target.value;
        setInput(newuser);
    }

    const submit = async (e) => {
        e.preventDefault();
        try{
        let res = await Axios.post("http://localhost:5000/login", ({ username: input.username, password: input.password }));
        console.log(`response ${res}`);
        console.log(res);
        res=res.data;
        if (!res.success) {
            alert(`${res.message}`);
        }
        if (res.success) {
            alert("login successfull");
            Navigate('/');

        }
    }catch(err){
        alert("Login Failed")
    }
    }
    return (
        <>
            <div className='bg-info bg-gradient h-100 '>
                <form className='container w-50  ' onSubmit={(e) => { submit(e) }}>
                    <div className='container h1 m-auto p-3 d-flex  mb-3'>
                        Login
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='username' onChange={(e) => { handleChange(e) }} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={(e) => { handleChange(e) }} />
                    </div>

                    <button type="submit" className="btn btn-success m-2">Submit</button>
                    <Link to='/signup' className='btn btn-danger m-2'>Not a User</Link>
                </form>
            </div>
        </>
    )
}
