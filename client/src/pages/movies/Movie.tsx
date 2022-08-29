import React,{ useEffect } from "react";
import { Col, Typography, Divider, Button } from "antd";
import { useAppSelector, useAppDispatch } from '../../store/hook'
import { fetchMoviesData } from "./slice";
import BaseBody from "../../common/baseBody/BaseBody";

export const Movie: React.FC = (props) => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.movies.status)
    const movieData = useAppSelector(state => state.movies.moviesList)
    useEffect(() => {
        if(status === "init"){
            dispatch(fetchMoviesData())
        }
    },[status,dispatch])
    return (
      <BaseBody></BaseBody>
    );
};
