import React, { useState } from "react";
import { useHistory, useNavigate } from "react-router-dom";



const  SignUp = (props) => {
    const [credentials, setCredentials] = useState({name:"", email: "", password: "" });
    const navigate = useNavigate()
    const{name,email,password} = credentials;
    const onChange = (e) => {
      //spered syntax
      //console.log("cgange")
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
      console.log(credentials);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      //onchage handle
  
      //Login through API
  
      const response = await fetch("http://localhost:5000/api/auth/createUser", {
        method: "POST",
  
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({  name,email,password }),
      });
      const json = await response.json();
      if (json.success) {
        //save the auth token and redirect redirect
        localStorage.setItem("token", json.authtoken);
        navigate("/login")
        props.showAlert("Please login", "success")
      } else {
        //alert
        props.showAlert("Invalid credencials", "danger")
      }
      console.log(json);
    };
  return (
    <div className='container'>
       <h2 style={{"color":"purple"}}>Create an account to use  <i style={{"color":"red"}}>i</i><i style={{"color":"blue"}}>Notebook</i></h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp"  onChange={onChange} value={credentials.name}/>
         
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp"  onChange={onChange} value={credentials.email}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' aria-describedby="emailHelp" onChange={onChange}  value={credentials.password} minLength={5}/>
           
        </div>
        
       
        <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
    </div>
  )
}

export default SignUp
