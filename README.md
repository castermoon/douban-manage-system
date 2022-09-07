# 豆瓣后台管理系统

## 前端页面构成

### 电影信息页movies

1. 电影列表的信息展示，增删改查。
2. 添加电影与人物的关系movie_celebrity。
3. 搜索

### 人物页celebrity

1. 人物列表的信息展示，增删改查。

### 	comments

1. 短评列表的信息展示，增删改查。

### 长评页 longComments

1. 长评列表的信息展示，增删改查。

### 用户页user

1. 用户列表的信息展示，增删改查。

### 登录页login

登录功能，在登录成功时会将用户信息保存在前端。





# 搭建前端开发环境

## 创建项目

使用typescript版本

```
npx create-react-app my-app --template typescript
```

## 引入redux

安装redux redux-tookit react-redux  redux-persist

```
cnpm i redux redux-tookit react-redux redux-persist -S
```

redux-tookit 可以简化redux的使用，本身内置了immutable.js，让我们可以修改state。还把创建reducer，actionCreator等操作全部放到一个slice中。本身内置redux-thunk，在extraReducers中还可以定义异步操作请求成功失败时的操作。大幅度简化了redux的使用。



redux-persist则有把指定reducer设置为本地存储的作用。通过redux-persist可以保存用户登录成功的用户信息，防止组件被重新渲染时用户信息丢失。



最后为了适配typescript，还要在store下创建一个hook.ts，在使用useDispatch, useSelector时换成useAppDispatch,useAppSelector。

```typescript
//store.ts
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
});

const persistedReducer = persistReducer(persistConfig, rootReducer) 

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>   //这里是为了防止redux-persist产生的报错
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
```



```typescript
//hook.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './index'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```



```tsx
//index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/style/reset.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import rootStore from './store/index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={rootStore.store}>
            <PersistGate persistor={rootStore.persistor}>
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
```

## 引入路由react-router-dom

这里的路由使用的是query查询参数路由

在组件中获取路由的方式

```tsx
//在组件中获取路由参数
import {useSearchParams} from "react-router-dom";

const [searchParams,setSearchParams]= useSearchParams()

const url = searchParams.toString()  //这里的url为路由的查询参数
```

```tsx
//页面跳转
import { useNavigate } from "react-router-dom";
navigate(`/movies?name=${value}`)
```

```tsx
//App.tsx
<BrowserRouter>
    <Routes>
        <Route index element={<Home/>} />
        <Route path="movies" element={<Movie />} />
        <Route path="celebrity" element={<Celebrity/>}/>
        <Route path="longComments" element={<LongComments/>}/>
        <Route path="comments" element={<Comments/>}/>
        <Route path="users" element={<Users/>}/>
        <Route path="login" element={<Login/>}/>
    </Routes>
</BrowserRouter>
```

## 引入antd

```
cnpm i antd -S
```

在App.css中引入antd的css文件

```css
//App.css
@import '~antd/dist/antd.css';
```

然后就可以组件中使用了

```tsx
import { Input,Button } from "antd";
```

## 引入axios

使用axios完成ajax请求。

```
cnpm i axios -s
```

```ts
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
```

## 引入http-proxy-middleware

在src目录下创建setupProxy.js文件。http-proxy-middleware可以帮我们帮请求转发到后端服务器。

```js
//setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
 app.use('/api', createProxyMiddleware({target: 'http://localhost:8000', changeOrigin: true}));
}
```

## 初始化css文件

将初始化css文件reset.css引入App.tsx

```css
//reset.css
@charset "utf-8";html{touch-action: manipulation;background-color:#fff;color:#000;font-size:12px}
body,ul,ol,dl,dd,h1,h2,h3,h4,h5,h6,figure,form,fieldset,legend,input,textarea,button,p,blockquote,th,td,pre,xmp{margin:0;padding:0}
body,input,textarea,button,select,pre,xmp,tt,code,kbd,samp{line-height:1.5;font-family:tahoma,arial,"Hiragino Sans GB",simsun,sans-serif}
h1,h2,h3,h4,h5,h6,small,big,input,textarea,button,select{font-size:100%}
h1,h2,h3,h4,h5,h6{font-family:tahoma,arial,"Hiragino Sans GB","微软雅黑",simsun,sans-serif}
h1,h2,h3,h4,h5,h6,b,strong{font-weight:normal}
address,cite,dfn,em,i,optgroup,var{font-style:normal}
table{border-collapse:collapse;border-spacing:0;text-align:left}
caption,th{text-align:inherit}
ul,ol,menu{list-style:none}
fieldset,img{border:0}
img,object,input,textarea,button,select{vertical-align:middle}
article,aside,footer,header,section,nav,figure,figcaption,hgroup,details,menu{display:block}
audio,canvas,video{display:inline-block;*display:inline;*zoom:1}
blockquote:before,blockquote:after,q:before,q:after{content:"\0020"}
textarea{overflow:auto;resize:vertical}
input,textarea,button,select,a{outline:0 none;border: none;}
button::-moz-focus-inner,input::-moz-focus-inner{padding:0;border:0}
mark{background-color:transparent}
a,ins,s,u,del{text-decoration:none}
sup,sub{vertical-align:baseline}
html {overflow-x: hidden;height: 100%;font-size: 50px;-webkit-tap-highlight-color: transparent;}
body {font-family: Arial, "Microsoft Yahei", "Helvetica Neue", Helvetica, sans-serif;color: #333;font-size: .28em;line-height: 1;-webkit-text-size-adjust: none;}
hr {height: .02rem;margin: .1rem 0;border: medium none;border-top: .02rem solid #cacaca;}
a {text-decoration: none;}
```

## 搭建页面共有部分

```tsx
const BaseBody: React.FC<PropsType> = ({children}) => {
  return (
    <div className={styles["container"]}>
      <CommonMenu/>
      <div className={styles["right-body"]}>
        <TopHeader/>
        <div className={styles["content"]}>
          <Card>
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
};
```

![image-20220906150649879](C:\Users\hp\AppData\Roaming\Typora\typora-user-images\image-20220906150649879.png)

## 登录注销

![image-20220906150712531](C:\Users\hp\AppData\Roaming\Typora\typora-user-images\image-20220906150712531.png)
