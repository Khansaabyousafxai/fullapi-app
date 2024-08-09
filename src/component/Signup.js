import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

const Signup = () => {
    
    const [credentials, setCredentials] = useState({name:"", email: "", password: ""  , cpassword: "" });
    let navigate = useNavigate();
    const { name, email, password } = credentials;

    const onSubmitfunc = async (e) => {
      e.preventDefault();
    
      try {
        // Make the POST request using axios
        const response = await axios.post("http://localhost:5000/api/auth/createuser", 
          { name, email, password }, 
          { headers: { "Content-Type": "application/json" } }
        );
    
        // Handle the response data
        const json = response.data;
        console.log(json);
        if (json.success) {
          localStorage.setItem('token', json.authtoken);
          navigate("/");
        } else {
          alert("error");
        }
      } catch (error) {
        // Handle errors
        console.error('Error:', error.response ? error.response.data : error.message);
        alert("An error occurred");
      }
    };
    
    
    const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
  return (
    <div className='container'>
<form className="my-3" onSubmit={onSubmitfunc}>
<div className="mb-3">
    <label htmlFor="name" className="form-label">
      Name
    </label>
    <input
      type="text"
      className="form-control"
      id="name"
      name="name"
      aria-describedby="emailHelp"
      onChange={onChange}
    />
   
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">
      Email address
    </label>
    <input
      type="email"
      className="form-control"
      id="email"
      name="email"

      aria-describedby="emailHelp"
      onChange={onChange}
    />
   
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">
      Password
    </label>
    <input
      type="password"
      className="form-control"
      id="password"
      name="password"
      onChange={onChange}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">
      confirm Password
    </label>
    <input
      type="password"
      className="form-control"
      id="cpassword"
      name="cpassword"
      onChange={onChange}
    />
  </div>
  <button type="submit" className="btn btn-primary">
    Submit
  </button>
</form>
    </div>

  )

}

export default Signup
