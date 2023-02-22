import React, { useState,useEffect } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import {baseUrl} from "../config/urls.config"


function Login() {
  const [userName, setUserName] = useState("");
  const [password, setpassword] = useState("");
  const [errorMessage,setErrorMessage]= useState(' ')
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    e.preventDefault();

    console.log(`${baseUrl}/auth/login`);
    axios.post(`${baseUrl}/auth/login`, {
        username: userName,
        password: password,
      })
      .then((response) => {
        console.log("start")
        console.log  (response);
        

        const data =response.status

        if (data===200){
          navigate("/home")
        }
        
      })

      
      .catch((error) => {
       
        console.log(error);
        console.log(error.response.data.error)
        setErrorMessage(error.response.data.error)
      })
      
  };



  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, []);

  function onBackButtonEvent(e) {
    e.preventDefault();
    window.history.forward();
  }


  return (
    <div className="body">
      <div className="container">
        <div className="card card-container">
          <img
            id="profile-img"
            className="profile-img-card"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt=" "
          />
          <p id="profile-name" className="profile-name-card"></p>
          <form className="form-signin" onSubmit={handleInputChange}>
            <span id="reauth-email" className="reauth-email"></span>
            <input
              type="text"
              id="inputEmail"
              className="form-control"
              placeholder="UserName"
              value={userName}
              required
              autoFocus
              onChange={(e) => setUserName(e.target.value)}
            />

            <input
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              required
              onChange={(e) => setpassword(e.target.value)}
            />
            {errorMessage && (<p className="error_message">{errorMessage}</p>)}
            {/* <p>{errorMessage}</p> */}
           
            <button
              className="btn btn-lg btn-primary btn-block btn-signin"
              type="submit"
            >
              Sign In
            </button>
           
          </form>
          {/* <!-- /form --> */}
          
        </div>
        {/* <!-- /card-container --> */}
      </div>
      {/* <!-- /container --> */}
    </div>
  );
}

export default Login;
