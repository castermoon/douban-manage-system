import { createSlice,PayloadAction,createAsyncThunk } from '@reduxjs/toolkit'
import { message } from "antd";
import type { RootState } from '../../store'
import axios from "axios"


export interface loginInfo{
  username:string;
  password:string;
}

export interface userInfoType{
  id:number;
  username:string;
  nickname:string;
}

interface state {
  loginValue:loginInfo,
  loginStatus:"init" | "loading" | "succ" | "failed"
  userInfo:userInfoType | null
}


const initialState:state = {
  loginValue:{} as loginInfo,
  loginStatus:"init",
  userInfo:null
}

export const login = createAsyncThunk(`login/login`, async (loginInfo:loginInfo) => {
  const response = await axios.post("/api/login",{
    username:loginInfo.username,
    password:loginInfo.password
  })
  return response.data
})

export const logout = createAsyncThunk(`login/logout`, async () => {
  const response = await axios.post("/api/logout",{})
  return response.data
})

const loginSlice = createSlice({
  name:"login",
  initialState,
  reducers: {
    setUserInfo(state,action){
      state.userInfo = action.payload
    }
  },
  extraReducers: {
    [login.pending.type]: (state) => {
      state.loginStatus = "loading"
    },
    [login.fulfilled.type]: (state, action) => {
      if(action.payload.errno === 0){
        state.loginStatus = "succ"
        state.userInfo = action.payload.data.data
        message.info("登录成功")
      }else {
        message.error(action.payload.message)
      }
    },
    [login.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loginStatus = "failed";
      message.error("未知错误")
    },
    [logout.fulfilled.type]: (state, action) => {
      if(action.payload.errno === 0){
        message.info("注销成功")
      }else {
        message.error(action.payload.message)
      }
    },
    [logout.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loginStatus = "failed";
      message.error("未知错误")
    }
  }
})

export const { setUserInfo } = loginSlice.actions

// //Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default loginSlice.reducer
