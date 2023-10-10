import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import YouTube from "react-youtube";
import Card from "react-bootstrap/Card";
import "./Card.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [movie, setMovie] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
       "https://api.themoviedb.org/3/movie/top_rated?api_key=dc020f909339a92ea9ef0c8bb9d07ee3&language=en-US&page=1"
      );

      const moviesWithTrailers = await Promise.all(
        response.data.results.map(async (movie) => {
          const trailerResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=dc020f909339a92ea9ef0c8bb9d07ee3&language=en-US`
          );
          const trailer = trailerResponse.data.results.find(
            (video) => video.type === "Trailer"
          );
          return { ...movie, trailer };
        })
      );

      setMovie(moviesWithTrailers);
      setData(response.data.results);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
    setShowTrailer(true);
  };
  const closeTrailer = () => {
    setShowTrailer(false);
  };
  const opts = {
    width: "100%",
    height: 360,
  };

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=dc020f909339a92ea9ef0c8bb9d07ee3&language=en-US&page=1"
    )
      .then((res) => res.json())

      .then((d) => setData(d.results));
  }, []);
  const searchMovies = async (e) => {
    try {
      e.preventDefault();
      const url = `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=`;
      const res = await fetch(url);
      const data = await res.json();
      setData(data.results);
    } catch (error) {
      console.log("Nomovies");
    }
  };

  return (
    <div className="homeapp">
      <Carousel  showThumbs={false} selectedItem={selectedCardIndex}>
        {movie &&
          movie.map((item, index) => (
            <div key={item.id} onClick={() => handleCardClick(index)}>
              <header className="header">
                <div>
                  <img
                    style={{ height: "500px" ,marginBottom:"100px"}}
                    src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                    alt=""
                  />
                </div>
                <div className="legend">
                  <h1>{item.name}</h1>
                  <p>{item.overview}</p>
                  <p>{item.vote_average}</p>
                  {showTrailer && item.trailer ? (
                    <div>
                      <button className="trailerButton" onClick={closeTrailer}>
                        Close Trailer
                      </button>
                      {showTrailer && item.trailer ? (
                        <div>
                          <YouTube videoId={item.trailer.key} opts={opts} />
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <button
                      className="trailerButton"
                      onClick={() => handleCardClick(index)}
                    >
                      Watch Trailer
                    </button>
                  )}
                </div>
              </header>
            </div>
          ))}
      </Carousel>

      <section>
        {data &&
          data.map((item) => {
            return (
              <div className="card" key={item.id}>
                <div className="img-card">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                    alt=""
                  />
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
};
export default Home;
