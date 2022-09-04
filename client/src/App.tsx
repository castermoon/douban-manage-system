import React,{ FC } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import { Movie } from "./pages/movies/Movie";
import { Celebrity } from "./pages/celebrity/Celebrity";
import { Home } from "./pages/home/Home";
import { LongComments } from "./pages/longComments/LongComments";
import { Comments } from "./pages/comments/comments";
import {Users} from "./pages/users/Users";
import Login from "./pages/login/Login";

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
        <Route path="comments" element={<Comments/>}/>
        <Route path="users" element={<Users/>}/>
        <Route path="login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
);

export default App;
