import React,{ useEffect } from "react";
import BaseBody from "../../common/baseBody/BaseBody";
import { Card,Input,Button } from "antd";
import ATable from "./components/tabel/ATable";
import { useAppSelector,useAppDispatch } from "../../store/hook"
import { deleteMoviesData,setMoviesStatus } from "./slice";
import AModel from "./components/aModel/AModel";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

export const Movie: React.FC = (props) => {
  const selectedMoviesRowKeys = useAppSelector(state => state.movies.selectedMoviesRowKeys)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleMoviesDelete = async (selectedRowKeys:number[]) => {
    try {
      await dispatch(deleteMoviesData(selectedRowKeys)).unwrap()
    } catch (err) {
      console.error('删除失败: ', err)
    }
  }

  const onSearch = (value: string) => {
    navigate(`/movies?name=${value}`)
    dispatch(setMoviesStatus("init"))
  }

  return (
    <BaseBody>
      <Search placeholder="按照名字搜索" onSearch={onSearch} style={{ width: 200,marginRight:30 }} />
      {/*<Search placeholder="按照类型搜索" onSearch={onSearch} style={{ width: 200,marginRight:30 }} />*/}
      {/*<Search placeholder="按照作者搜索" onSearch={onSearch} style={{ width: 200,marginRight:30 }} />*/}
      <Button type="primary" onClick={() => handleMoviesDelete(selectedMoviesRowKeys)} style={{ float:"right" }}>删除选中电影</Button>
      <AModel/>
      <ATable/>
    </BaseBody>
  );
};
