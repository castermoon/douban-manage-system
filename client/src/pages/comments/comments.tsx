import React,{ useEffect } from "react";
import BaseBody from "../../common/baseBody/BaseBody";
import { Card,Input,Button } from "antd";
import ATable from "./components/tabel/ATable";
import { useAppSelector,useAppDispatch } from "../../store/hook"
import { deleteData,setStatus } from "./commentsSlice";
import AModel from "./components/aModel/AModel";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

export const Comments: React.FC = (props) => {
  const selectedRowKeys = useAppSelector(state => state.comments.selectedRowKeys)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleDelete = async (selectedRowKeys:number[]) => {
    try {
      await dispatch(deleteData(selectedRowKeys)).unwrap()
    } catch (err) {
      console.error('删除失败: ', err)
    }
  }

  const onSearch = (value: string) => {
    navigate(`/comments?content=${value}`)
    dispatch(setStatus("init"))
  }

  return (
    <BaseBody>
      <Search placeholder="按照内容搜索" onSearch={onSearch} style={{ width: 200,marginRight:30 }} />
      <Button type="primary" onClick={() => handleDelete(selectedRowKeys)} style={{ float:"right" }}>删除选中短评</Button>
      <AModel/>
      <ATable/>
    </BaseBody>
  );
};
