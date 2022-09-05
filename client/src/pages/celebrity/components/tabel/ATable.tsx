import { Table,Button,Tooltip } from 'antd';
import React, {useEffect} from "react";
import {
  fetchCelebrityData,
  celebrityItemType,
  setCelebrityTableSelectedRowKeys,
  setIsModalVisible,
  setCelebrityRecord,
  setModelType
} from "../../celebritySlice";
import {useAppDispatch,useAppSelector} from "../../../../store/hook";
import {useSearchParams} from "react-router-dom";



const ATable: React.FC = () => {
  const dispatch = useAppDispatch()
  const [searchParams,setSearchParams]= useSearchParams()
  const tableData = useAppSelector(state => state.celebrity.celebrityList)
  const fetchStatus = useAppSelector(state => state.celebrity.status)
  const selectedCelebrityRowKeys = useAppSelector(state => state.celebrity.selectedCelebrityRowKeys)
  const url = searchParams.toString()
  useEffect(() => {
    if(fetchStatus === "init"){
      dispatch(fetchCelebrityData(url))
    }
  },[fetchStatus,url])

  const onSelectChange = (newSelectedRowKeys: number[]) => {
    dispatch(setCelebrityTableSelectedRowKeys(newSelectedRowKeys))
  };

  const rowSelection = {
    selectedCelebrityRowKeys,
    onChange: onSelectChange,
  };

  const handleEditRecord = (celebrityRecord:celebrityItemType) => {
    dispatch(setIsModalVisible(true))
    dispatch(setModelType("edit"))
    dispatch(setCelebrityRecord(celebrityRecord))
  }

  const columns = [
    {
      title: '操作',
      align: "center",
      dataIndex: 'operation',
      width: 50,
      render: (_: any, record: celebrityItemType) => {
        return  (
          <Button type={"primary"} size={"small"} onClick={() => handleEditRecord(record)}>编辑</Button>
        )
      }
    },
    {
      title: 'id',
      dataIndex: 'id',
      width: '50px',
      align: 'center'
    },
    {
      title: '名字',
      dataIndex: 'name',
      width: '100px',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (name:string) => (
        <Tooltip placement="topLeft" title={name}>
          {name}
        </Tooltip>
      ),
    },
    {
      title: '头像',
      dataIndex: 'icon',
      width:  "200px",
      align: 'center'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      width: '40px',
      align: "center"
    },
    {
      title: '职业',
      dataIndex: 'vocation',
      width: '100px',
      align: "center"
    },
    {
      title: '星座',
      dataIndex: 'constellation',
      width: '100px',
      align: "center",
    },
    {
      title: '出生日期',
      dataIndex: 'birth',
      width: '80px',
      align: "center"
    },
    {
      title: '别名',
      dataIndex: 'anotherName',
      width: '80px',
      align: "center"
    },
    {
      title: '其他中文名',
      dataIndex: 'anotherChineseName',
      width: '60px',
      align: "center"
    },
    {
      title: 'indbLink',
      dataIndex: 'indbLink',
      width: '100px',
      align: "center"
    },
    {
      title: '官网',
      dataIndex: 'web',
      width: '100px',
      align: "center",
    },
    {
      title: '简介',
      dataIndex: 'desc',
      width: '200px',
      align: "center",
      ellipsis: {
        showTitle: false,
      },
      render: (name:string) => (
        <Tooltip placement="topLeft" title={name}>
          {name}
        </Tooltip>
      ),
    }
  ];


  return (
    <div>
      {/*@ts-ignore*/}
      <Table columns={columns} rowSelection={rowSelection}
        dataSource={tableData}
        scroll={{ x: 2000   }}
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
