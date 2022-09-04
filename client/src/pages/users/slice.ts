import { createSlice,PayloadAction,createAsyncThunk } from '@reduxjs/toolkit'
import { message } from "antd";

import type { RootState } from '../../store'

import axios from "axios"
const name = 'user'
export interface itemType{
  id:number;
  username:string;
  password:string;
  nickname:string;
}

interface state {
  list:itemType[],
  status:"init" | "loading" | "succ" | "failed"
  error: string | null;
  selectedRowKeys:number[],
  isModalVisible:Boolean,
  record:itemType, //弹出框编辑时表单自带的内容
  modelType:"add" | "edit"    //弹出框是添加还是编辑
}


const initialState:state = {
  list:[],
  status:"init",
  error:null,
  selectedRowKeys:[],
  isModalVisible:false,
  record:{} as itemType,
  modelType:"add"
}

export const fetchData = createAsyncThunk(`${name}/fetchData`, async (url:string) => {
  const response = await axios.get(`/api/getUsers?${url}`)
  return response.data
})

export const deleteData = createAsyncThunk(`${name}/deleteData`, async (deleteIdsArr:number[]) => {
  const response = await axios.post("/api/deleteUsers",{
    deleteIdsArr
  })
  return response.data
})


export const createData = createAsyncThunk(`${name}/create`, async (values:any) => {
  const { username, password, nickname } = values
  console.log(nickname)
  const response = await axios.post("/api/createUser",{
    username,
    password,
    nickname:nickname||username
  })
  return response.data
})

export const updateData = createAsyncThunk(`${name}/update`, async (values:any) => {
  const { id,username,password,nickname, } = values
  const response = await axios.post("/api/updateUser",{
    id,
    username,
    password,
    nickname,
  })
  return response.data
})


const slice = createSlice({
  name,
  initialState,
  reducers: {
    setTableSelectedRowKeys:(state,action) => {
      state.selectedRowKeys = action.payload
    },
    setIsModalVisible:(state,action) => {
      state.isModalVisible = action.payload
    },
    setStatus:(state,action) => {
      state.status = action.payload
    },
    setRecord:(state,action) => {
      state.record = action.payload
    },
    setModelType:(state,action) => {
      state.modelType = action.payload
    },
  },
  extraReducers: {
    [fetchData.pending.type]: (state) => {
      state.status = "loading"
    },
    [fetchData.fulfilled.type]: (state, action) => {
      state.status = "succ"
      state.error = null;
      state.list = action.payload.data.result
    },
    [fetchData.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [deleteData.fulfilled.type]: (state, action) => {
      message.info('删除成功');
      state.status = "init"
    },
    [deleteData.rejected.type]: (state, action) => {
      message.error('删除失败');
      state.error = action.payload
    },
    [createData.fulfilled.type]: (state, action) => {
      message.info('添加成功');
      state.status = "init"
    },
    [createData.rejected.type]: (state, action) => {
      message.error('添加失败');
      state.error = action.payload
    },
    [updateData.fulfilled.type]: (state, action) => {
      state.status = "init"
      message.info('编辑成功');
    },
    [updateData.rejected.type]: (state, action) => {
      message.error('编辑失败');
    },
  }
})

export const { setTableSelectedRowKeys,setIsModalVisible,setStatus,setRecord,setModelType } = slice.actions

// //Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default slice.reducer
