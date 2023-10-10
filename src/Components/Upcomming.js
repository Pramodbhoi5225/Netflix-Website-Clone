import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";


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
      "https://api.themoviedb.org/3/movie/upcoming?api_key=dc020f909339a92ea9ef0c8bb9d07ee3&language=en-US&page=1"
    )
      .then((res) => res.json())
      .then((d) => setData(d.results));
  }, []);

  return (
    <div className="app">
    
      <Carousel>
        {data.map((item, index) => (
          <div key={index}>
            <header className="header">
              <img style={{height:'600px'}}
                src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                alt=""
              />
              <p className="legend">
                <h1>{item.name}</h1>
                <p>{item.overview}</p>
                <p>{item.vote_average}</p>
              </p>
            </header>
          </div>
        ))}
      </Carousel>

      <section>
        {data &&
          data.map((item) => {
            return (
              <div className="card">
                <div className="img-card">
                  <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}alt="" />
                </div>
                <div className="bio">
                  <h1 className="title">{item.original_name}</h1>
                  <p className="name">{item.first_air_date}</p>
                </div>
              </div>
            );
          })}
      </section>
    </div>
  );
}

export default Home;
