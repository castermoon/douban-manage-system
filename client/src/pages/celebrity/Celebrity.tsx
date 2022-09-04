import React,{ useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../../store/hook'
import BaseBody from "../../common/baseBody/BaseBody";
import {Button,Input} from "antd";
import AModel from "../celebrity/components/aModel/AModel";
import ATable from "../celebrity/components/tabel/ATable";
import {useNavigate} from "_react-router-dom@6.3.0@react-router-dom";
import {deleteCelebrityData, setCelebrityStatus} from "./celebritySlice";
const { Search } = Input;


export const Celebrity: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const selectedCelebrityRowKeys = useAppSelector(state => state.celebrity.selectedCelebrityRowKeys)

  const handleCelebrityDelete = async (selectedRowKeys:number[]) => {
    try {
      await dispatch(deleteCelebrityData(selectedRowKeys)).unwrap()
    } catch (err) {
      console.error('删除失败: ', err)
    }
  }

  const onSearch = (value: string) => {
    navigate(`/celebrity?name=${value}`)
    dispatch(setCelebrityStatus("init"))
  }

  return (
    <BaseBody>
      <Search placeholder="按照名字搜索" onSearch={onSearch} style={{ width: 200,marginRight:30 }} />
      {/*<Search placeholder="按照类型搜索" onSearch={onSearch} style={{ width: 200,marginRight:30 }} />*/}
      {/*<Search placeholder="按照作者搜索" onSearch={onSearch} style={{ width: 200,marginRight:30 }} />*/}
      <Button type="primary" onClick={() => handleCelebrityDelete(selectedCelebrityRowKeys)} style={{ float:"right" }}>删除选中人物</Button>
      <AModel/>
      <ATable/>
    </BaseBody>
  );
};
