import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Signup = () => {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    });
    const [error, setError] = useState("");
    let navigate = useNavigate();
  
    const handleClick = async (e) => {
        e.preventDefault();

        // Basic validation
        if (credentials.password !== credentials.cpassword) {
            setError("Passwords do not match.");
            return;
        }
        
        try {
            const response = await axios.post("http://localhost:5000/api/auth/createuser", {
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                cpassword: credentials.cpassword
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = response.data;
            if (data.success) {
                localStorage.setItem('token', data.authtoken);
                navigate("/");
            } else {
                setError("Sign up failed. Please try again.");
            }
          
        } catch (error) {
            console.error('Error fetching user data:', error.response ? error.response.data : error.message);
            setError("An error occurred. Please try again later.");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className='container'>
            <form onSubmit={handleClick}>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={credentials.name}
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
                        value={credentials.email}
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
                        value={credentials.password}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="cpassword"
                        name="cpassword"
                        value={credentials.cpassword}
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

export default Signup;
