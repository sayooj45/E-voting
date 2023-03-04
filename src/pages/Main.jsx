import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { CgLogOff } from "react-icons/cg";
import { MdDeleteForever } from "react-icons/md";
import "./Main.css";
import vote from "../components/images/vote.jpg";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../config/urls.config";
function Main() {
  const [candidates, setData] = useState([]);
  // const [candidateId,setcandidateId] = useState([]);

  useEffect(() => {
    const baseURL = `${baseUrl}/vote/getCandidates`;
    axios
      .get(baseURL)
      .then((response) => {
        const data = response.data;
        console.log(response.data);
        setData(data.candidates);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
  };

  const handleChange = (id) => {
    axios
      .post(`${baseUrl}/vote/deleteCandidate`, {
        candidate_id: id,
      })
      .then((response) => {
        console.log(response);
        window.location.reload();

        // navigate('/home')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {/* navbar */}
      <Navbar className="nav" expand="lg">
        <Container fluid>
          <img className="img" src={vote} alt=" " />
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Nav.Link href="#" className="view-result mx-2">
              Home
            </Nav.Link>
            <Nav.Link href="/votelist" className="view-result mx-2">
              View Result
            </Nav.Link>
            {/* <Nav.Link href="#action1" active className="mx-2">
              Lock & Start
            </Nav.Link>
            <Nav.Link href="#action1" active className="mx-2">
              End Vote & Lock
            </Nav.Link> */}
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
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr>
                <td>{candidate.candidate_id}</td>
                <td>{candidate.candidate_name}</td>
                <td>
                  <MdDeleteForever onClick={() => handleChange(candidate.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-5">
        <Link to="/user">
          <button className="btn " type="button">
            Add Candidate
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Main;
