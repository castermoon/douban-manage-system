import { configureStore,combineReducers } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import moviesReducer from '../pages/movies/slice'
import celebrityReducer from "../pages/celebrity/celebritySlice"
import longCommentsSlice from "../pages/longComments/longCommentsSlice";
import commentsSlice from "../pages/comments/commentsSlice";
import usersSlice from "../pages/users/slice"
import loginSlice from "../pages/login/loginSlice"
import movieRelationSlice from "../pages/movieRelationList/slice"

const persistConfig = {  // **
    key: 'root',// 储存的标识名
    storage, // 储存方式
    whitelist: ["login"] //白名单 模块参与缓存
}

const rootReducer = combineReducers({
    movies: moviesReducer,
    celebrity:celebrityReducer,
    longComments:longCommentsSlice,
    comments:commentsSlice,
    users:usersSlice,
    login:loginSlice,
    movieRelation:movieRelationSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(store)

export default { store, persistor };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
