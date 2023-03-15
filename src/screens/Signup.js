import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
import { Link,useNavigate } from 'react-router-dom';

export default function Signup() {
    const [input, setinput] = useState({ name: "", location: "", email: "", password: "" });
    const Navigate=useNavigate();

    const handleChange = (e) => {
        const newuser = { ...input }
        newuser[e.target.name] = e.target.value;
        setinput(newuser);
    }

    const submit = async(e) => {
        e.preventDefault();
        try{
       let response= await Axios.post("http://localhost:5000/signUp", ({ name: input.name, location: input.location, email: input.email, password: input.password }))
       response = response.data;
        console.log(response);
        if(!response.success){
            alert(`${response.message}`);
        }
        else {
            alert("Success")
            Navigate("/login");
        }
    }catch(err){
        alert("Error")
        console.log(err);
    }
    }
    return (
        <>

        <div className=''>
            <form className='container w-50' onSubmit={(e)=>{submit(e)}}>

            <div className='h1 ml-auto p-3 d-flex justify-center'>
           Sign Up
        </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='name' onChange={(e)=>handleChange(e)} />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Geo Location</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='location' onChange={(e)=>handleChange(e)} />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={(e)=>handleChange(e)} />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={(e)=>handleChange(e)} />
                </div>

                <button type="submit" className="btn btn-primary m-2">Submit</button>
                <Link to='/login' className="btn btn-success m-2">Already a User</Link>  
            </form>
            </div>
        </>
    )
}
