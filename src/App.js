import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Home";
import Tvshow from './Components/Tvshow';
import Upcomming from './Components/Upcomming'
import TopRated from './Components/TopRated'
import Navbar from './Components/Navbar';







const App = () => {
  return (
    <div>     

      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/tvshow" element={<Tvshow />}></Route>
          <Route path="/upcomming" element={<Upcomming />}></Route>
          <Route path="/top_rated" element={<TopRated />}></Route>
          
        </Routes>
      </BrowserRouter>
    
    
    </div>
  );
};

export default App;


