import React,{ useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../../store/hook'
import BaseBody from "../../common/baseBody/BaseBody";


export const Celebrity: React.FC = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.movies.status)
  const movieData = useAppSelector(state => state.movies.moviesList)

  return (
    <BaseBody></BaseBody>
  );
};
