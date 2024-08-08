import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: credentials.email,
        password: credentials.password
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      
      const data = response.data;
      if (data.success) {
          localStorage.setItem('token',data.authtoken);
        navigate("/");
      }
    
    } catch (error) {
      console.error('Error fetching user data:', error.response ? error.response.data : error.message);
      alert("invalid");
    }
  };
  
  
  

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={credentials.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="Password"
            onChange={onChange}
            value={credentials.password}
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
