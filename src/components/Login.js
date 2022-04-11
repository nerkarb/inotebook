import React, { useState } from "react";
import { useHistory, useNavigate } from "react-router-dom";

const Login = () => {
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
    if (json.success) {
      //save the auth token and redirect redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/")
    } else {
      //alert
      alert("INvalid credentials");
    }
    console.log(json);
  };

  return (
    <div className="container">
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
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
