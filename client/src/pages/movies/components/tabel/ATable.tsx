import { Table, Button, Tooltip, Image} from "antd";
import React, {Fragment, useEffect} from "react";
import {
  fetchMoviesData,
  movieDatatype,
  setMoviesTableSelectedRowKeys,
  setIsModalVisible,
  setMoviesRecord,
  setModelType,
  setAddRelationModelVisible, setAddRelationMovieId
} from "../../slice";
import {useAppDispatch,useAppSelector} from "../../../../store/hook";
import {useNavigate, useSearchParams} from "react-router-dom";
import {setStatus} from "../../../movieRelationList/slice";



const ATable: React.FC = () => {
  const dispatch = useAppDispatch()
  const [searchParams]= useSearchParams()
  const tableData = useAppSelector(state => state.movies.moviesList)
  const fetchStatus = useAppSelector(state => state.movies.status)
  const selectedMoviesRowKeys = useAppSelector(state => state.movies.selectedMoviesRowKeys)
  const navigate = useNavigate()
  const url = searchParams.toString()

  useEffect(() => {
    if(fetchStatus === "init"){
      dispatch(fetchMoviesData(url))
    }
  },[fetchStatus,url,dispatch])


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

  const handleAddRelation = (movieId:number) => {
    dispatch(setAddRelationModelVisible(true))
    dispatch(setAddRelationMovieId(movieId))
  }

  const handleLinkRelationPage = (movieId:number) => {
    navigate(`/movies/movieRelationList?movie_id=${movieId}`)
    dispatch(setStatus("init"))
  }

  const columns = [
    {
      title: '操作',
      align: "center",
      dataIndex: 'operation',
      width: 70,
      render: (_: any, record: movieDatatype) => {
        return  (
          <Fragment>
            <Button type={"primary"} size={"small"} onClick={() => handleEditRecord(record)} style={{marginBottom:5}}>编辑</Button>
            <Button type={"primary"} size={"small"} onClick={() => handleAddRelation(record.id)} style={{marginBottom:5}}>添加关联</Button>
            <Button type={"primary"} size={"small"} onClick={() => handleLinkRelationPage(record.id)}>查看所有关联</Button>
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
      title: '封面',
      dataIndex: 'cover',
      width:  "100px",
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (cover:string) => (
        <Image src={cover} width={"100px"}/>
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
