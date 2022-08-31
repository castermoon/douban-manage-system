import React,{ FC } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import { Movie } from "./pages/movies/Movie";
import { Celebrity } from "./pages/celebrity/Celebrity";
import {Home} from "./pages/home/Home";
import {LongComments} from "./pages/longComments/LongComments";

const App: FC = () => (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Home/>} />
    //     <Route path="/movies" element={<Movie />} />
    //     <Route path="/celebrity" element={<Celebrity/>}/>
    //     <Route path="/longComments" element={<LongComments/>}/>
    //   </Routes>
    // </BrowserRouter>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>} />
        <Route path="movies" element={<Movie />} />
        <Route path="celebrity" element={<Celebrity/>}/>
        <Route path="longComments" element={<LongComments/>}/>
      </Routes>
    </BrowserRouter>
);

export default App;
