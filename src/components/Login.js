import React, { useState } from "react";
import { useHistory, useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate()

  const onChange = (e) => {
    //spered syntax
    //console.log("cgange")
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    console.log(credentials);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    //onchage handle

    //Login through API

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json)
    if (json.success) {
      //save the auth token and redirect redirect
      console.log(json.authToken)
      localStorage.setItem("token", json.authToken);
      console.log(localStorage.getItem("token"))
      navigate("/")
      props.showAlert("Welcome to i-Notebook", "success")
    } else {
      //alert
      props.showAlert("Invalid Credencials for login", "success")
    }
    //console.log(json);
  };

  return (
    <div className="container">
      <h2 style={{"color":"purple"}}>Login to continue to <i style={{"color":"red"}}>i</i><i style={{"color":"blue"}}>Notebook</i></h2>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
   
          <label className="form-label">E-mail address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={credentials.email}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={credentials.password}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
