import { createSlice,PayloadAction,createAsyncThunk } from '@reduxjs/toolkit'
import { message } from "antd";

import axios from "axios"
export interface movieDatatype{
    id:number;
    name:string;
    cover:string;
    type:string;
    web:string;
    country:string;
    language:string;
    time:string;
    timeLen:number;
    anotherName:string;
    brief:string;
    score:number;
    indbLink:string;
}

interface movieState {
    moviesList:movieDatatype[],
    status:"init" | "loading" | "succ" | "failed"
    error: string | null;
    selectedMoviesRowKeys:number[],
    isModalVisible:Boolean,
    moviesRecord:movieDatatype, //弹出框编辑时表单自带的内容
    modelType:"add" | "edit",    //弹出框是添加还是编辑
    addRelationModelVisible:Boolean,
    addRelationMovieId:number //弹出添加关联框时被关联的电影的id
}


const initialState:movieState = {
    moviesList:[],
    status:"init",
    error:null,
    selectedMoviesRowKeys:[],
    isModalVisible:false,
    moviesRecord:{} as movieDatatype,
    modelType:"add",
    addRelationModelVisible:false,
    addRelationMovieId:0
}

export const fetchMoviesData = createAsyncThunk('movies/fetchMoviesData', async (url:string) => {
    const response = await axios.get(`/api/getMovies?${url}`)
    return response.data
})

export const deleteMoviesData = createAsyncThunk('movies/deleteMoviesData', async (deleteMoviesIdArr:number[]) => {
    const response = await axios.post("/api/deleteMovies",{
        deleteIdsArr:deleteMoviesIdArr
    })
    return response.data
})


export const createMovie = createAsyncThunk('movies/createMovie', async (values:any) => {
    const { name,cover,type,web,country,language,timeLen,anotherName,indbLink,score,brief,time } = values
    const response = await axios.post("/api/createMovie",{
        name,
        score,
        language,
        type,
        cover:cover || "",
        web:web|| "",
        country:country||"",
        timeLen:timeLen||0,
        anotherName:anotherName||"",
        indbLink:indbLink||"",
        brief:brief||"",
        time:time||"2008-08-16"
    })
    return response.data
})

export const updateMovie = createAsyncThunk('movies/updateMovie', async (values:any) => {
    const { id,name,cover,type,web,country,language,timeLen,anotherName,indbLink,score,brief,time } = values
    const response = await axios.post("/api/updateMovie",{
        id,
        name,
        score,
        language,
        type,
        cover,
        web,
        country,
        timeLen,
        anotherName,
        indbLink,
        brief,
        time:time.substring(0,10)
    })
    return response.data
})

export const createMovieRelation = createAsyncThunk('movies/addMovieRelation', async (values:any) => {
    const { movie_id,celebrity_id,position } = values
    const response = await axios.post("/api/addMovieRelation",{
        movie_id,
        celebrity_id,
        position
    })
    return response.data
})



const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMoviesTableSelectedRowKeys:(state,action) => {
            state.selectedMoviesRowKeys = action.payload
        },
        setIsModalVisible:(state,action) => {
            state.isModalVisible = action.payload
        },
        setMoviesStatus:(state,action) => {
            state.status = action.payload
        },
        setMoviesRecord:(state,action) => {
            state.moviesRecord = action.payload
        },
        setModelType:(state,action) => {
            state.modelType = action.payload
        },
        setAddRelationModelVisible:(state,action) => {
            state.addRelationModelVisible = action.payload
        },
        setAddRelationMovieId:(state,action) => {
            state.addRelationMovieId = action.payload
        },
    },
    extraReducers: {
        [fetchMoviesData.pending.type]: (state) => {
            state.status = "loading"
        },
        [fetchMoviesData.fulfilled.type]: (state, action) => {
            if(action.payload.errno === 0){
                state.status = "succ"
                state.moviesList = action.payload.data.moviesList
            }else {
                state.status = "init"
            }
        },
        [fetchMoviesData.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.status = "failed";
            state.error = action.payload;
        },
        [deleteMoviesData.fulfilled.type]: (state, action) => {
            message.info('删除成功');
            state.status = "init"
        },
        [deleteMoviesData.rejected.type]: (state, action) => {
            message.error('删除失败');
            state.error = action.payload
        },
        [createMovie.fulfilled.type]: (state, action) => {
            message.info('添加成功');
            state.status = "init"
        },
        [createMovie.rejected.type]: (state, action) => {
            message.error('添加失败');
            state.error = action.payload
        },
        [updateMovie.fulfilled.type]: (state, action) => {
            state.status = "init"
            message.info('编辑成功');
        },
        [updateMovie.rejected.type]: (state, action) => {
            message.error('编辑失败');
        },
        [createMovieRelation.fulfilled.type]: (state, action) => {
            message.info('添加成功');
        },
        [createMovieRelation.rejected.type]: (state, action) => {
            message.error('添加失败');
        },

    }
})

export const {
    setMoviesTableSelectedRowKeys,
    setIsModalVisible,
    setMoviesStatus,
    setMoviesRecord,
    setModelType,
    setAddRelationModelVisible,
    setAddRelationMovieId
} = moviesSlice.actions

// //Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default moviesSlice.reducer
