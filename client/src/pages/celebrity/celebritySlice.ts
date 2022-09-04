import { createSlice,PayloadAction,createAsyncThunk } from '@reduxjs/toolkit'
import { message } from "antd";

import type { RootState } from '../../store'
import axios from "axios"
export interface celebrityItemType{
  id:number;
  name:string;
  icon:string;
  sex:string;
  constellation:string;
  birth:string;
  vocation:string;
  anotherName:string;
  anotherChineseName:string;
  web:string;
  desc:string;
  indbLink:string;
}

interface celebrityState {
  celebrityList:celebrityItemType[],
  status:"init" | "loading" | "succ" | "failed"
  error: string | null
  selectedCelebrityRowKeys:number[],
  isModalVisible:Boolean,
  celebrityRecord:celebrityItemType, //弹出框编辑时表单自带的内容
  modelType:"add" | "edit"    //弹出框是添加还是编辑
}


const initialState:celebrityState = {
  celebrityList:[],
  status:"init",
  error: null,
  selectedCelebrityRowKeys:[],
  isModalVisible:false,
  celebrityRecord:{} as celebrityItemType, //弹出框编辑时表单自带的内容
  modelType:"add"    //弹出框是添加还是编辑
}

export const fetchCelebrityData = createAsyncThunk('celebrity/fetchCelebrityData', async (url:string) => {
  const response = await axios.get(`/api/getCelebrity?${url}`)
  return response.data
})

export const deleteCelebrityData = createAsyncThunk('celebrity/deleteCelebrityData', async (deleteCelebrityIdArr:number[]) => {
  const response = await axios.post("/api/deleteCelebrity",{
    deleteIdsArr:deleteCelebrityIdArr
  })
  return response.data
})


export const createCelebrity = createAsyncThunk('celebrity/createCelebrity', async (values:any) => {
  const { name, icon, sex, constellation, birth, vocation, anotherName, anotherChineseName, web, desc, indbLink } = values
  const response = await axios.post("/api/createCelebrity ",{
    name,
    icon:icon||"",
    sex:sex||3,
    constellation:constellation||"",
    birth:birth||"",
    vocation:vocation||"",
    anotherName:anotherName||"",
    anotherChineseName:anotherChineseName||"",
    web:web||"",
    desc:desc||"",
    indbLink:indbLink||""
  })
  return response.data
})

export const updateCelebrity = createAsyncThunk('celebrity/updateCelebrity', async (values:any) => {
  const { id,name, icon, sex, constellation, birth, vocation, anotherName, anotherChineseName, web, desc, indbLink } = values
  const response = await axios.post("/api/updateCelebrity",{
    id,
    name,
    icon:icon||"",
    sex:sex||3,
    constellation:constellation||"",
    birth:birth||"",
    vocation:vocation||"",
    anotherName:anotherName||"",
    anotherChineseName:anotherChineseName||"",
    web:web||"",
    desc:desc||"",
    indbLink:indbLink||""
  })
  return response.data
})


const celebritySlice = createSlice({
  name: 'celebrity',
  initialState,
  reducers: {
    setCelebrityTableSelectedRowKeys:(state,action) => {
      state.selectedCelebrityRowKeys = action.payload
    },
    setIsModalVisible:(state,action) => {
      state.isModalVisible = action.payload
    },
    setCelebrityStatus:(state,action) => {
      state.status = action.payload
    },
    setCelebrityRecord:(state,action) => {
      state.celebrityRecord = action.payload
    },
    setModelType:(state,action) => {
      state.modelType = action.payload
    },
  },
  extraReducers: {
    [fetchCelebrityData.pending.type]: (state) => {
      state.status = "loading"
    },
    [fetchCelebrityData.fulfilled.type]: (state, action) => {
      state.status = "succ"
      state.error = null;
      state.celebrityList = action.payload.data.result
    },
    [fetchCelebrityData.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [deleteCelebrityData.fulfilled.type]: (state, action) => {
      message.info('删除成功');
      state.status = "init"
    },
    [deleteCelebrityData.rejected.type]: (state, action) => {
      message.error('删除失败');
      state.error = action.payload
    },
    [createCelebrity.fulfilled.type]: (state, action) => {
      message.info('添加成功');
      state.status = "init"
    },
    [createCelebrity.rejected.type]: (state, action) => {
      message.error('添加失败');
      state.error = action.payload
    },
    [updateCelebrity.fulfilled.type]: (state, action) => {
      state.status = "init"
      message.info('编辑成功');
    },
    [updateCelebrity.rejected.type]: (state, action) => {
      message.error('编辑失败');
    },
  }
})

export const {
  setCelebrityTableSelectedRowKeys,
  setCelebrityStatus,
  setIsModalVisible,
  setCelebrityRecord,
  setModelType
} = celebritySlice.actions

// //Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default celebritySlice.reducer
