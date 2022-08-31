import { Form, Input, InputNumber, Popconfirm, Table, Typography,Button,Tooltip } from 'antd';
import React, {useEffect, useState} from "react";
import {
  fetchMoviesData,
  movieDatatype,
  setMoviesTableSelectedRowKeys,
  setIsModalVisible, setMoviesRecord, setModelType
} from "../../slice";
import {useAppDispatch,useAppSelector} from "../../../../store/hook";
import {useSearchParams} from "react-router-dom";



const ATable: React.FC = () => {
  const dispatch = useAppDispatch()
  const [searchParams,setSearchParams]= useSearchParams()
  const tableData = useAppSelector(state => state.movies.moviesList)
  const fetchStatus = useAppSelector(state => state.movies.status)
  const selectedMoviesRowKeys = useAppSelector(state => state.movies.selectedMoviesRowKeys)

  const url = searchParams.toString()
  useEffect(() => {
    if(fetchStatus === "init"){
      dispatch(fetchMoviesData(url))
    }
  },[fetchStatus,url])

  const onSelectChange = (newSelectedRowKeys: number[]) => {
    dispatch(setMoviesTableSelectedRowKeys(newSelectedRowKeys))
  };

  const rowSelection = {
    selectedMoviesRowKeys,
    onChange: onSelectChange,
  };

  const handleEditRecord = (moviesRecord:movieDatatype) => {
    dispatch(setIsModalVisible(true))
    dispatch(setModelType("edit"))
    dispatch(setMoviesRecord(moviesRecord))
  }

  const columns = [
    {
      title: '操作',
      align: "center",
      dataIndex: 'operation',
      width: 50,
      render: (_: any, record: movieDatatype) => {
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
      title: '封面',
      dataIndex: 'cover',
      width:  "100px",
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (cover:string) => (
        <Tooltip placement="topLeft" title={cover}>
          {cover}
        </Tooltip>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: '100px',
      align: "center"
    },
    {
      title: '官网',
      dataIndex: 'web',
      width: '100px',
      align: "center",
      ellipsis: {
        showTitle: false,
      },
      render: (web:string) => (
        <Tooltip placement="topLeft" title={web}>
          {web}
        </Tooltip>
      ),
    },
    {
      title: '国家',
      dataIndex: 'country',
      width: '80px',
      align: "center"
    },
    {
      title: '语言',
      dataIndex: 'language',
      width: '100px',
      align: "center"
    },
    {
      title: '上映日期',
      dataIndex: 'time',
      width: '80px',
      align: "center"
    },
    {
      title: '时长',
      dataIndex: 'timeLen',
      width: '60px',
      align: "center"
    },
    {
      title: '别名',
      dataIndex: 'anotherName',
      width: '100px',
      align: "center"
    },
    {
      title: '简介',
      dataIndex: 'brief',
      width: '100px',
      align: "center",
      ellipsis: {
        showTitle: false,
      },
      render: (brief:string) => (
        <Tooltip placement="topLeft" title={brief}>
          {brief}
        </Tooltip>
      ),
    },
    {
      title: '评分',
      dataIndex: 'score',
      width: '60px',
      align: "center",
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
