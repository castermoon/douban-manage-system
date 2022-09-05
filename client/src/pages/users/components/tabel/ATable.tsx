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
  const [searchParams,setSearchParams]= useSearchParams()
  const tableData = useAppSelector(state => state.users.list)
  const fetchStatus = useAppSelector(state => state.users.status)
  const url = searchParams.toString()
  useEffect(() => {
    if(fetchStatus === "init"){
      dispatch(fetchData(url))
    }
  },[fetchStatus,url])

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
          <Button type={"primary"} size={"small"} onClick={() => handleEditRecord(record)}>编辑</Button>
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
      title: '用户名',
      dataIndex: 'username',
      width: '60px',
      align: 'center'
    },
    {
      title: '密码',
      dataIndex: 'password',
      width:  "30px",
      align: 'center',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
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
