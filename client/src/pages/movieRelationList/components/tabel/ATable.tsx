import { Table,Button } from 'antd';
import React, {useEffect} from "react";
import {
  fetchData,
  itemType,
  setTableSelectedRowKeys,
  setIsModalVisible,
  setRecord,
  setModelType
} from "../../slice";
import {useAppDispatch,useAppSelector} from "../../../../store/hook";
import {useSearchParams} from "react-router-dom";



const ATable: React.FC = () => {
  const dispatch = useAppDispatch()
  const [searchParams]= useSearchParams()
  const tableData = useAppSelector(state => state.movieRelation.list)
  const fetchStatus = useAppSelector(state => state.movieRelation.status)
  const url = searchParams.toString()
  useEffect(() => {
    if(fetchStatus === "init"){
      dispatch(fetchData(url))
    }
  },[fetchStatus,url,dispatch])

  const onSelectChange = (newSelectedRowKeys: number[]) => {
    dispatch(setTableSelectedRowKeys(newSelectedRowKeys))
  };

  const rowSelection = {
    setTableSelectedRowKeys,
    onChange: onSelectChange,
  };

  const handleEditRecord = (record:itemType) => {
    dispatch(setIsModalVisible(true))
    dispatch(setModelType("edit"))
    dispatch(setRecord(record))
  }

  const columns = [
    {
      title: '操作',
      align: "center",
      dataIndex: 'operation',
      width: 50,
      render: (_: any, record: itemType) => {
        return  (
          <Button type={"primary"} size={"small"} onClick={() => handleEditRecord(record)} style={{marginBottom:5}}>编辑</Button>
        )
      }
    },
    {
      title: 'id',
      dataIndex: 'id',
      width: '30px',
      align: 'center'
    },
    {
      title: '电影id',
      dataIndex: 'movie_id',
      width: '60px',
      align: 'center'
    },
    {
      title: '人物id',
      dataIndex: 'celebrity_id',
      width:  "30px",
      align: 'center',
    },
    {
      title: '人物名称',
      dataIndex: 'name',
      width:  "30px",
      align: 'center',
    },
    {
      title: '职位',
      dataIndex: 'position',
      width: '60px',
      align: "center"
    }
  ];


  return (
    <div>
      {/*@ts-ignore*/}
      <Table columns={columns} rowSelection={rowSelection}
        dataSource={tableData}
        scroll={{ x: 900  }}
        bordered
        style={{marginTop:20,fontSize:12}}
        pagination={{
          pageSize:7
        }}
        rowKey={record => record.id}
      />
    </div>
  );
};

export default ATable;
