import { Table,Button,Tooltip } from 'antd';
import React, {Fragment, useEffect} from "react";
import {
  fetchCelebrityData,
  celebrityItemType,
  setCelebrityTableSelectedRowKeys,
  setIsModalVisible,
  setCelebrityRecord,
  setModelType
} from "../../celebritySlice";
import {useAppDispatch,useAppSelector} from "../../../../store/hook";
import {useNavigate, useSearchParams} from "react-router-dom";
import {setStatus} from "../../../movieRelationList/slice";



const ATable: React.FC = () => {
  const dispatch = useAppDispatch()
  const [searchParams]= useSearchParams()
  const tableData = useAppSelector(state => state.celebrity.celebrityList)
  const fetchStatus = useAppSelector(state => state.celebrity.status)
  const selectedCelebrityRowKeys = useAppSelector(state => state.celebrity.selectedCelebrityRowKeys)
  const url = searchParams.toString()
  const navigate = useNavigate()
  useEffect(() => {
    if(fetchStatus === "init"){
      dispatch(fetchCelebrityData(url))
    }
  },[fetchStatus,url,dispatch])

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

  const handleNavigateRelation = (celebrity_id:number) => {
    navigate(`/celebrity/movieRelationList?celebrity_id=${celebrity_id}`)
    dispatch(setStatus("init"))
  }


  const columns = [
    {
      title: '操作',
      align: "center",
      dataIndex: 'operation',
      width: 120,
      render: (_: any, record: celebrityItemType) => {
        return  (
          <Fragment>
            <Button type={"primary"} size={"small"} onClick={() => handleEditRecord(record)}>编辑</Button>
            <Button type={"primary"} size={"small"} onClick={() => handleNavigateRelation(record.id)}>查看所有关联</Button>
          </Fragment>
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
