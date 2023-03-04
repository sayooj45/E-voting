import React from "react";
import "./Adduser.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../config/urls.config";
function Adduser() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [id, setId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    e.preventDefault();

    axios
      .post(`${baseUrl}/vote/addCandidate`, {
        name: user,
        position: id,
      })
      .then((response) => {
        console.log(response);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.error);
      });
  };

  return (
    <div>
      <div className="card">
        <form action="">
          <input
            type="number"
            id="inputPassword"
            min="1"
            className="form-control"
            placeholder="Candidate Id"
            required
            onChange={(e) => setId(e.target.value)}
          />
          <br />
          <input
            type="text"
            id="inputPassword"
            className="form-control"
            placeholder="Candidate Name"
            required
            onChange={(e) => setUser(e.target.value)}
          />
          <br />
          {errorMessage && <p className="error_message">{errorMessage}</p>}

          <button
            className="btn-1 btn-lg btn-dark btn-block btn-signin"
            type="submit"
            onClick={handleChange}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Adduser;
