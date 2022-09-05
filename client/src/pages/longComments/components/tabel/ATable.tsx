import { Table,Button,Tooltip } from 'antd';
import React, {useEffect} from "react";
import {
  fetchLongCommentsData,
  longCommentItemType,
  setLongCommentsTableSelectedRowKeys,
  setIsModalVisible,
  setLongCommentsRecord,
  setModelType
} from "../../longCommentsSlice";
import {useAppDispatch,useAppSelector} from "../../../../store/hook";
import {useSearchParams} from "react-router-dom";



const ATable: React.FC = () => {
  const dispatch = useAppDispatch()
  const [searchParams,setSearchParams]= useSearchParams()
  const tableData = useAppSelector(state => state.longComments.longCommentsList)
  const fetchStatus = useAppSelector(state => state.longComments.status)
  const selectedLongCommentsRowKeys = useAppSelector(state => state.longComments.selectedLongCommentsRowKeys)
  const url = searchParams.toString()
  useEffect(() => {
    if(fetchStatus === "init"){
      dispatch(fetchLongCommentsData(url))
    }
  },[fetchStatus,url])

  const onSelectChange = (newSelectedRowKeys: number[]) => {
    dispatch(setLongCommentsTableSelectedRowKeys(newSelectedRowKeys))
  };

  const rowSelection = {
    selectedLongCommentsRowKeys,
    onChange: onSelectChange,
  };

  const handleEditRecord = (longCommentsRecord:longCommentItemType) => {
    dispatch(setIsModalVisible(true))
    dispatch(setModelType("edit"))
    dispatch(setLongCommentsRecord(longCommentsRecord))
  }

  const columns = [
    {
      title: '操作',
      align: "center",
      dataIndex: 'operation',
      width: 50,
      render: (_: any, record: longCommentItemType) => {
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
      width: '30px',
      align: 'center'
    },
    {
      title: '电影id',
      dataIndex: 'movie_id',
      width:  "30px",
      align: 'center',
    },
    {
      title: '标题',
      dataIndex: 'title',
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
    },
    {
      title: '是否剧透',
      dataIndex: 'spoiler',
      width: '80px',
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
