import "./Votelist.css";
import React, { useState, useEffect } from "react";

import axios from "axios";

import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { CgLogOff } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import voteimg from "../components/images/vote.jpg";
import { baseUrl } from "../config/urls.config";

function Votelist() {
  const [vote, setVote] = useState([]);

  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
  };

  useEffect(() => {
    const URL = `${baseUrl}/vote/getCandidateVotes`;
    axios
      .get(URL)
      .then((response) => {
        const votes = response.data;
        console.log(response.data);
        setVote(votes.candidates);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {/* navbar */}
      <Navbar className="nav" expand="lg">
        <Container fluid>
          <img className="img" src={voteimg} alt=" " />
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Nav.Link href="/home" className="view-result mx-2">
              Home
            </Nav.Link>
            <Nav.Link href="#" className="view-result mx-2">
              View Result
            </Nav.Link>

            <span className="mx-2 logout" onClick={logout}>
              Logout
              <CgLogOff />
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* navbar */}

      {/* table */}
      <div className="table-border">
        <table>
          <thead>
            <tr className="table-head">
              <th>No</th>
              <th>Name</th>
              <th>Vote</th>
            </tr>
          </thead>
          <tbody>
            {vote.map((votes) => (
              <tr>
                <td>{votes.candidate_id}</td>
                <td>{votes.candidate_name}</td>
                <td>{votes.vote_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> 
    </div>
  );
}

export default Votelist;
