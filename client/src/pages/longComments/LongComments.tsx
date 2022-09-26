import React,{  } from "react";
import BaseBody from "../../common/baseBody/BaseBody";
import { Input,Button } from "antd";
import ATable from "./components/tabel/ATable";
import { useAppSelector,useAppDispatch } from "../../store/hook"
import { deleteLongCommentsData,setLongCommentsStatus } from "./longCommentsSlice";
import AModel from "./components/aModel/AModel";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

const LongComments: React.FC = (props) => {
  const selectedLongCommentsRowKeys = useAppSelector(state => state.longComments.selectedLongCommentsRowKeys)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLongCommentsDelete = async (selectedRowKeys:number[]) => {
    try {
      await dispatch(deleteLongCommentsData(selectedRowKeys)).unwrap()
    } catch (err) {
      console.error('删除失败: ', err)
    }
  }

  const onSearch = (value: string) => {
    navigate(`/longComments?title=${value}`)
    dispatch(setLongCommentsStatus("init"))
  }

  return (
    <BaseBody>
      <Search placeholder="按照标题搜索" onSearch={onSearch} style={{ width: 200,marginRight:30 }} />
      <Button type="primary" onClick={() => handleLongCommentsDelete(selectedLongCommentsRowKeys)} style={{ float:"right" }}>删除选中长评</Button>
      <AModel/>
      <ATable/>
    </BaseBody>
  );
};

export default LongComments
