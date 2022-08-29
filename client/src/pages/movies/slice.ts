import { createSlice,PayloadAction,createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import axios from "axios"
interface movieDatatype{
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
    commentsCount:number;
    longCommentsCount:number;
    movieScore:number;
    indbLink?:string;
}

interface movieState {
    moviesList:movieDatatype[],
    status:"init" | "loading" | "succ" | "failed"
    error: string | null;
}


const initialState:movieState = {
    moviesList:[],
    status:"init",
    error:null
}

export const fetchMoviesData = createAsyncThunk('movies/fetchMoviesData', async () => {
    const response = await axios.get('/api/getMovies')
    // console.log(response.data)
    return response.data
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchMoviesData.pending.type]: (state) => {
            state.status = "loading"
        },
        [fetchMoviesData.fulfilled.type]: (state, action) => {
            state.status = "succ"
            state.error = null;
            state.moviesList = action.payload.data.moviesList
        },
        [fetchMoviesData.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.status = "failed";
            state.error = action.payload;
        },
    }
})

export const {  } = moviesSlice.actions

// //Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default moviesSlice.reducer
