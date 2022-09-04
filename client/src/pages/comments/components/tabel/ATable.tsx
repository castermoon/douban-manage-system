import { Form, Input, InputNumber, Popconfirm, Table, Typography,Button,Tooltip } from 'antd';
import React, {useEffect, useState} from "react";
import {
  fetchData,
  itemType,
  setTableSelectedRowKeys,
  setIsModalVisible,
  setRecord,
  setModelType
} from "../../commentsSlice";
import {useAppDispatch,useAppSelector} from "../../../../store/hook";
import {useSearchParams} from "react-router-dom";



const ATable: React.FC = () => {
  const dispatch = useAppDispatch()
  const [searchParams,setSearchParams]= useSearchParams()
  const tableData = useAppSelector(state => state.comments.list)
  const fetchStatus = useAppSelector(state => state.comments.status)
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
      title: '评论者id',
      dataIndex: 'user_id',
      width: '60px',
      align: 'center'
    },
    {
      title: '电影id',
      dataIndex: 'movie_id',
      width:  "30px",
      align: 'center',
    },
    {
      title: '是否看过',
      dataIndex: 'status',
      width: '60px',
      align: "center"
    },
    {
      title: '标签',
      dataIndex: 'labelList',
      width: '60px',
      align: "center"
    },
    {
      title: '是否自己可见',
      dataIndex: 'onlyMe',
      width: '60px',
      align: "center"
    },
    {
      title: '是否分享',
      dataIndex: 'isShare',
      width: '60px',
      align: "center"
    },
    {
      title: '内容',
      dataIndex: 'content',
      width: '100px',
      align: "center",
      ellipsis: {
        showTitle: false,
      },
      render: (content:string) => (
        <Tooltip placement="topLeft" title={content}>
          {content}
        </Tooltip>
      ),
    },
    {
      title: '日期',
      dataIndex: 'date',
      width: '80px',
      align: "center"
    },
    {
      title: '评分',
      dataIndex: 'score',
      width: '50px',
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
