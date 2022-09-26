import React,{  } from "react";
import BaseBody from "../../common/baseBody/BaseBody";
import { Input,Button } from "antd";
import ATable from "./components/tabel/ATable";
import { useAppSelector,useAppDispatch } from "../../store/hook"
import { deleteData,setStatus } from "./slice";
import AModel from "./components/aModel/AModel";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

const Users: React.FC = (props) => {
  const selectedRowKeys = useAppSelector(state => state.users.selectedRowKeys)
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
    navigate(`/users?username=${value}`)
    dispatch(setStatus("init"))
  }

  return (
    <BaseBody>
      <Search placeholder="按照用户名搜索" onSearch={onSearch} style={{ width: 200,marginRight:30 }} />
      <Button type="primary" onClick={() => handleDelete(selectedRowKeys)} style={{ float:"right" }}>删除选中用户</Button>
      <AModel/>
      <ATable/>
    </BaseBody>
  );
};

export default Users
