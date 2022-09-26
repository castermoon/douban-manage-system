import React,{ FC,lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import Movie from "./pages/movies/Movie";
import Celebrity from "./pages/celebrity/Celebrity";
import Home from "./pages/home/Home";
import LongComments from "./pages/longComments/LongComments";
import Comments from "./pages/comments/Comments";
import Users from "./pages/users/Users";
import Login from "./pages/login/Login";
import MovieRelationList from "./pages/movieRelationList/MovieRelationList";
import MovieStatistics from "./pages/movieStatistics/MovieStatistics";
// const Home = lazy(() => import("./pages/home/Home"))
// const Movie = lazy(() => import("./pages/movies/Movie"))
// const Celebrity = lazy(() => import("./pages/celebrity/Celebrity"))
// const LongComments = lazy(() => import("./pages/longComments/LongComments"))
// const Comments = lazy(() => import("./pages/comments/Comments"))
// const Users = lazy(() => import("./pages/users/Users"))
// const Login = lazy(() => import("./pages/login/Login"))
// const MovieRelationList = lazy(() => import("./pages/movieRelationList/MovieRelationList"))
// const MovieStatistics = lazy(() => import("./pages/movieStatistics/MovieStatistics"))

const App: FC = () => (
    <BrowserRouter>
      {/*<React.Suspense fallback={<div>loading</div>}>*/}
        <Routes>
          <Route index element={<Home/>} />
          <Route path="movies" element={<Movie />} />
          <Route path="celebrity" element={<Celebrity/>}/>
          <Route path="com/longComments" element={<LongComments/>}/>
          <Route path="com/comments" element={<Comments/>}/>
          <Route path="com" element={<Comments/>}/>
          <Route path="users" element={<Users/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="movies/movieRelationList" element={<MovieRelationList/>}/>
          <Route path="celebrity/movieRelationList" element={<MovieRelationList/>}/>
          <Route path="movies/movieStatistics" element={<MovieStatistics/>}/>
        </Routes>
    {/*</React.Suspense>*/}
</BrowserRouter>
);




export default App;
