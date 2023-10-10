import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import './Navbar.css'

function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const searchMovie = async (e) => {
    try {
      e.preventDefault();
      const url = `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=dc020f909339a92ea9ef0c8bb9d07ee3`;
      const res = await fetch(url);
      const data = await res.json();
      setData(data.results);
    } catch (error) {
      console.log("No Movies");
    }
  };

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/tv/popular?api_key=dc020f909339a92ea9ef0c8bb9d07ee3&language=en-US&page=1"
    )
      .then((res) => res.json())
      .then((d) => setData(d.results));
  }, []);

  return (
    <div className="app">
      <Navbar expand="lg" className="bg-body-tertiary container">
        <Container fluid>
          <Navbar.Brand href="#">
            <img
              src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png"
              alt=""
              style={{ height: "20px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0 ">
              <Link className="link1" to={"/"}>Home</Link>
              <Link className="link1" to={"/tvshow"}>Tv Show</Link>
              <Link className="link1" to={"/upcomming"}>Upcomming</Link>
              <Link className="link1" to={"/top_rated"}>Top Rated</Link>
            </Nav>
            <Form className="d-flex" onSubmit={searchMovie}>
              <Form.Control
                type="search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    
    </div>
  );
}

export default Home;
