import React,{  } from "react";
import BaseBody from "../../common/baseBody/BaseBody";
import { Button } from "antd";
import ATable from "./components/tabel/ATable";
import { useAppSelector,useAppDispatch } from "../../store/hook"
import { deleteData } from "./slice";
import AModel from "./components/aModel/AModel";


const MovieRelationList: React.FC = (props) => {
  const selectedRowKeys = useAppSelector(state => state.movieRelation.selectedRowKeys)
  const dispatch = useAppDispatch()

  const handleDelete = async (selectedRowKeys:number[]) => {
    try {
      await dispatch(deleteData(selectedRowKeys)).unwrap()
    } catch (err) {
      console.error('删除失败: ', err)
    }
  }


  return (
    <BaseBody>
      <Button type="primary" onClick={() => handleDelete(selectedRowKeys)} style={{ float:"right",marginBottom:15 }}>删除选中关联</Button>
      <AModel/>
      <ATable/>
    </BaseBody>
  );
};

export default MovieRelationList
