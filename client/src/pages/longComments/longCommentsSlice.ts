import { createSlice,PayloadAction,createAsyncThunk } from '@reduxjs/toolkit'
import { message } from "antd";

import type { RootState } from '../../store'
import axios from "axios"
export interface longCommentItemType{
  id:number;
  user_id:number;
  movie_id:number;
  content:string;
  date:bigint;
  score:string;
  spoiler:number;
  title:string;
}

interface longCommentState {
  longCommentsList:longCommentItemType[],
  status:"init" | "loading" | "succ" | "failed"
  error: string | null;
  selectedLongCommentsRowKeys:number[],
  isModalVisible:Boolean,
  longCommentsRecord:longCommentItemType, //弹出框编辑时表单自带的内容
  modelType:"add" | "edit"    //弹出框是添加还是编辑
}


const initialState:longCommentState = {
  longCommentsList:[],
  status:"init",
  error:null,
  selectedLongCommentsRowKeys:[],
  isModalVisible:false,
  longCommentsRecord:{} as longCommentItemType,
  modelType:"add"
}

export const fetchLongCommentsData = createAsyncThunk('longComments/fetchLongCommentsData', async (url:string) => {
  const response = await axios.get(`/api/getLongComments?${url}`)
  return response.data
})

export const deleteLongCommentsData = createAsyncThunk('longComments/deleteLongCommentsData', async (deletelongCommentsIdArr:number[]) => {
  const response = await axios.post("/api/deleteLongComments",{
    deleteIdsArr:deletelongCommentsIdArr
  })
  return response.data
})


export const createLongComment = createAsyncThunk('longComments/createLongComment', async (values:any) => {
  const { movie_id,user_id,title,content,date,score,spoiler } = values
  console.log(movie_id,user_id,title,content,date,score,spoiler)
  const response = await axios.post("/api/createLongComment",{
    movie_id,
    user_id,
    title,
    content,
    score,
    spoiler:spoiler||0,
    date:date||Number(Date.now())
  })
  return response.data
})

export const updateLongComment = createAsyncThunk('longComments/updateLongComment', async (values:any) => {
  const { id,movie_id,user_id,title,content,date,score,spoiler } = values
  const response = await axios.post("/api/updateLongComment",{
    id,
    movie_id,
    user_id,
    title,
    content,
    score,
    spoiler,
    date
  })
  return response.data
})


const longCommentsSlice = createSlice({
  name: 'longComments',
  initialState,
  reducers: {
    setLongCommentsTableSelectedRowKeys:(state,action) => {
      state.selectedLongCommentsRowKeys = action.payload
    },
    setIsModalVisible:(state,action) => {
      state.isModalVisible = action.payload
    },
    setLongCommentsStatus:(state,action) => {
      state.status = action.payload
    },
    setLongCommentsRecord:(state,action) => {
      state.longCommentsRecord = action.payload
    },
    setModelType:(state,action) => {
      state.modelType = action.payload
    },
  },
  extraReducers: {
    [fetchLongCommentsData.pending.type]: (state) => {
      state.status = "loading"
    },
    [fetchLongCommentsData.fulfilled.type]: (state, action) => {
      state.status = "succ"
      state.error = null;
      state.longCommentsList = action.payload.data.result
    },
    [fetchLongCommentsData.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [deleteLongCommentsData.fulfilled.type]: (state, action) => {
      message.info('删除成功');
      state.status = "init"
    },
    [deleteLongCommentsData.rejected.type]: (state, action) => {
      message.error('删除失败');
      state.error = action.payload
    },
    [createLongComment.fulfilled.type]: (state, action) => {
      message.info('添加成功');
      state.status = "init"
    },
    [createLongComment.rejected.type]: (state, action) => {
      message.error('添加失败');
      state.error = action.payload
    },
    [updateLongComment.fulfilled.type]: (state, action) => {
      state.status = "init"
      message.info('编辑成功');
    },
    [updateLongComment.rejected.type]: (state, action) => {
      message.error('编辑失败');
    },
  }
})

export const { setLongCommentsTableSelectedRowKeys,setIsModalVisible,setLongCommentsStatus,setLongCommentsRecord,setModelType } = longCommentsSlice.actions

// //Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default longCommentsSlice.reducer
