# 豆瓣后台管理系统

## 页面构成

### 首页home

1. 展示用户信息。
2. 展示用户访问量。

### 电影信息页movies

1. 电影列表的信息展示，增删改查。
2. 根据名字搜索。
3. 添加电影与人物的关系movie_celebrity。

### 人物页celebrity

1. 人物列表的信息展示，增删改查。
1. 根据名字搜索。
1. 添加电影与人物的关系movie_celebrity。

### 	短评页comments

1. 短评列表的信息展示，增删改查。
1. 根据内容搜索。

### 长评页 longComments

1. 长评列表的信息展示，增删改查。
1. 根据标题搜索

### 用户页user

1. 用户列表的信息展示，增删改查。
1. 根据用户名搜索

### 登录页login

1. 登录功能，在登录成功时会将用户信息保存在前端。
2. 注销功能，注销时后清除用户信息。

### 电影和人物关联页面movieRelation

1. 根据页面url的路由参数展示电影对应的所有关联人物或人物关联的所有电影。

### 电影信息统计movieStatistics

1. 电影评分占比分布柱形图
2. 评分占比饼图
3. 评分趋势折线图

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

## 引入antv

antv是一个数据可视化图表框架。

```
cnpm i @ant-design/charts -S
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

# 搭建页面共有部分

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

## 侧边栏菜单

侧边栏菜单使用antd的menu组件，只需配置 相应的菜单项和组件，即可生成相应的侧边栏菜单。

```tsx
import { Menu } from 'antd';
import React from 'react';
import styles from "./commonMenu.module.css"
import { useNavigate,useLocation } from "react-router-dom";

const items = [
  { label: '首页', key: '' },
  { label: '电影管理', key: 'movies' },
  { label: '人物管理', key: 'celebrity' },
  {
    label: '评论管理',
    key: 'com',
    children: [{ label: '短评', key: 'com/comments' },{ label: '长评', key: 'com/longComments' }],
  },
  { label: '用户管理页', key: 'users' }
];


const CommonMenu: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const routerChange = (selectedKeys:string[]) => {
    const path = "/" + selectedKeys.join("/")
    navigate(path)
  }
  return (
    <div className={styles["menu-wrapper"]}>
      <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          theme="dark"
          items={items}
          style={{position:"fixed",top:0,left:0,width:"120px"}}
          onSelect={({ selectedKeys }:{selectedKeys:string[]}) => routerChange  (selectedKeys)}
          selectedKeys={[location.pathname.substring(1)]}
      >
      </Menu>
    </div>
  );
};

export default CommonMenu;
```

## 顶部header

顶部菜单有一个面包屑组件，他会页面的url生成相应的面包屑链接信息，而右边通过绝对定位显示登陆的用户信息，点击下拉菜单可以回到首页或者注销。

```tsx
import { Avatar,Dropdown,Menu,Button  } from 'antd';
import React, {Fragment} from "react";
import styles from "./topheader.module.css"
import ABreadcrumb from "../aBreadcrumb/ABreadcrumb";
import { UserOutlined,DownOutlined } from '@ant-design/icons';
import {Link, useNavigate} from "react-router-dom";
import {logout, setUserInfo} from "../../../../pages/login/loginSlice";
import {useAppDispatch} from "../../../../store/hook";
import {useAppSelector} from "../../../../store/hook";


const TopHeader: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const userInfo = useAppSelector(state => state.login.userInfo)
  const handleLogout = () => {
    dispatch(logout())
      .then(() => {
        navigate(`/login`)
        dispatch(setUserInfo(null))
      })
  }

  const handleLogin = () => {
    navigate(`/login`)
  }

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <Link to={"/"}>首页</Link>
          ),
        },
        {
          key: '2',
          label: (
            <div onClick={handleLogout}>注销</div>
          )
        }
      ]}
    />
  );

  return (
    <div className={styles["header"]}>
      <ABreadcrumb/>
      <div className={styles["users"]}>
        {
          userInfo ?
            <Fragment>
              <span className={styles["name"]}>{userInfo.nickname}</span>
              <Avatar size="small" icon={<UserOutlined />} style={{marginRight:"3px"}}/>
              <Dropdown overlay={menu}>
                <span onClick={e => e.preventDefault()}>
                  <DownOutlined/>
                </span>
              </Dropdown>
            </Fragment>
            :
          <Button size={"small"} onClick={handleLogin}>登录</Button>
        }
      </div>
    </div>
  );
};

export default TopHeader;
```

## 内容区content

内容区content为一个card组件，页面的内容区域会放到card组件中。

## 最终效果图

![image-20220906150649879](C:\Users\hp\AppData\Roaming\Typora\typora-user-images\image-20220906150649879.png)





# 登录注销

## 登录

登陆功能的提交通过一个antd的Form表单组件完成。点击登录后，会触发onFinish函数，调用dispatch派发login函数，在extraReducers中处理请求成功失败时state的相关操作。在请求成功时，会调用reducer setUserInfo把登录信息存储到state中，再调用then方法跳转到首页。

```tsx
<Form
  name="basic"
  labelCol={{ span: 5 }}
  wrapperCol={{ span: 16 }}
  onFinish={onFinish}
  onFinishFailed={onFinishFailed}
  autoComplete="off"
>
  <Form.Item
    label="用户名"
    name="username"
    rules={[{ required: true, message: '请输入用户名!' }]}
  >
    <Input />
  </Form.Item>

  <Form.Item
    label="密码"
    name="password"
    rules={[{ required: true, message: '请输入密码!' }]}
  >
    <Input.Password />
  </Form.Item>
  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
    <Button type="primary" htmlType="submit">
      登录
    </Button>
  </Form.Item>
</Form>
```

```tsx
const onFinish = (loginInfo: loginInfo) => {
  dispatch(login(loginInfo))
    .then(() => {
      navigate(`/`)
    });
};
```

```ts
export const login = createAsyncThunk(`login/login`, async (loginInfo:loginInfo) => {
  const response = await axios.post("/api/login",{
    username:loginInfo.username,
    password:loginInfo.password
  })
  return response.data
})
```

```ts
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
  }
}
```

## 注销

点击注销按钮时，调用dispatch派发logout函数，并在extraReducers中处理请求成功失败的相关操作。在请求成功时跳转到登录页面，并设置登录的用户信息userInfo为null。

```tsx
const handleLogout = () => {
  dispatch(logout())
    .then(() => {
      navigate(`/login`)
      dispatch(setUserInfo(null))
    })
}
```

```ts
export const logout = createAsyncThunk(`login/logout`, async () => {
  const response = await axios.post("/api/logout",{})
  return response.data
})
```

```ts
reducers: {
  setUserInfo(state,action){
    state.userInfo = action.payload
  }
},
extraReducers: {
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
```

而顶部header会根据userInfo判断显示登陆按钮还是用户信息

```tsx
<div className={styles["users"]}>
  {
    userInfo ?
      <Fragment>
        <span className={styles["name"]}>{userInfo.nickname}</span>
        <Avatar size="small" icon={<UserOutlined />} style={{marginRight:"3px"}}/>
        <Dropdown overlay={menu}>
          <span onClick={e => e.preventDefault()}>
            <DownOutlined/>
          </span>
        </Dropdown>
      </Fragment>
      :
    <Button size={"small"} onClick={handleLogin}>登录</Button>
  }
</div>
```

# 数据展示页面

页面主要由一个展示数据的表格tabel，编辑或新增数据的弹出框model，搜索框search组件组成。有增删改查，数据搜索功能。

## Table表格

### columns配置

1. 通过columns配置表格内容展示的内容，如果表格项展示的不是数据而是组件，则需要通过render方法渲染组件。
2. 通过指定width规定表格的宽度，align:center让表格居中。
3. 如果表格单项数据width过长，则需要设置文本省略ellipsis属性，并通过antd的Tooltip组件展示被省略的信息。

### Table配置

1. 如果表格整体width过长，则需要设置scroll属性让表格可以滚动，如scroll={{ x: 2000 }}。这里有一个极其重要的地方，就是表格的<font color="red">最外层容器需要设置overflow:hidden</font>才会生效；
2. 配置数据项的key值，如rowKey={record => record.id}
3. rowSelection定义多行选择的配置。

```tsx
<Table 
  columns={columns}              
  rowSelection={rowSelection}
  dataSource={tableData}
  scroll={{ x: 2000  }}
  bordered
  style={{marginTop:20,fontSize:12}}
  pagination={{
    pageSize:7
  }}
  rowKey={record => record.id}
/>
```

## Form表单

Form表单中的input框不能绑定value，如果要修改表单的值，需要useForm来接管表单的数据。

```tsx
const [form] = Form.useForm();

<Form
    form={form}
    name="basic"
    labelCol={{ span: 6 }}
    wrapperCol={{ span: 20 }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    style={{overflow:"hidden"}}
    >
    <Form.Item
        label="名字"
        name="name"
        rules={[{ required: true, message: '请输入名字!' }]}
        className={styles["input"]}
        >
        <Input allowClear  />
    </Form.Item>
    <Form.Item>
        <Button type="primary" htmlType="submit" >
            提交
        </Button>
    </Form.Item>
</Form>
```

```tsx
form.resetFields()    //表单中的input数据清空
form.setFieldsValue(valueObject)    //设置表单的所有数据项的值
form.setFieldValue("key",value)         //设置单个input框的值。
```



## 页面state

```ts
//表格数据项的类型
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
//初始数据类型
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
    moviesList:movieDatatype[],   //表格数据
    status:"init" | "loading" | "succ" | "failed" //获取数据的状态
    error: string | null;               //错误信息
    selectedMoviesRowKeys:number[],     //表格被选中的数据项的id数组
    model:{
        isModalVisible:Boolean, //弹出框是否显示
        initFormData:movieDatatype  //弹出框编辑时表单初始数据
        modelType:"add" | "edit"//弹出框是添加还是编辑
    }
    addRelationModelVisible:Boolean,  //添加关联弹出框是否显示
    addRelationMovieId:number //弹出添加关联框时被关联的电影的id
}


const initialState:movieState = {
    moviesList:[],
    status:"init",
    error:null,
    selectedMoviesRowKeys:[],
    model:{
        isModalVisible:false,
        initFormData: {} as movieDatatype,
        modelType:"add"
    },
    addRelationModelVisible:false,
    addRelationMovieId:0
}
```

## 获取数据

通过searchParams 获取页面路由参数，然后在useEffect中调用dispatch派发fetchMoviesData(url)获取表格数据。然后在extraReducers中获取设置请求成功失败时的相应操作。fetchStatus为表格数据获取状态，通过调用设置status可以让表格数据重新获取。

```tsx
const [searchParams]= useSearchParams()
const fetchStatus = useAppSelector(state => state.movies.status)
const url = searchParams.toString() 
useEffect(() => {
  if(fetchStatus === "init"){
    dispatch(fetchMoviesData(url))
  }
},[fetchStatus,url,dispatch])
```

```tsx
export const fetchMoviesData = createAsyncThunk('movies/fetchMoviesData', async (url:string) => {
    const response = await axios.get(`/api/getMovies?${url}`)
    return response.data
})
```

```ts
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
    }
}
```

## 删除数据

点击删除按钮时，派发deleteMoviesData(selectedRowKeys)事件，并在extraReducers中相应操作。

```ts
const handleMoviesDelete = async (selectedRowKeys:number[]) => {
    try {
        await dispatch(deleteMoviesData(selectedRowKeys)).unwrap()
    } catch (err) {
        console.error('删除失败: ', err)
    }
}
```

```ts
export const deleteMoviesData = createAsyncThunk('movies/deleteMoviesData', async (deleteMoviesIdArr:number[]) => {
    const response = await axios.post("/api/deleteMovies",{
        deleteIdsArr:deleteMoviesIdArr
    })
    return response.data
})
```

```ts
extraReducers: {
    [deleteMoviesData.fulfilled.type]: (state, action) => {
        message.info('删除成功');
        state.status = "init"
    },
    [deleteMoviesData.rejected.type]: (state, action) => {
        message.error('删除失败');
        state.error = action.payload
    }
}
```

## 增加数据

点击增加按钮，设置弹出框model显示，在设置弹出框的类型为增加add，

```tsx
  const handleCreateMovie =  () => {
    dispatch(setMovieModel({
      modelType:"add",
      isModalVisible:true,
    }))
  }
```

```tsx
useEffect(() => {                //如果弹出框类型modelType为"add"，则让表单数据初始化为空。
  if(modelType === "add"){
    form.resetFields()
  }else {
    //其他类型时的操作
  }
})
```

填写完表单信息后，点击提交触发onFinish函数，派发createMovie函数。

```ts
  const onFinish =  (values: any) => {
    if(movieModel.modelType === "add"){
        dispatch(createMovie(values))
    }else {
        //其他类型时的操作
    }
  };
```

```ts
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
```

```ts
[createMovie.fulfilled.type]: (state, action) => {
    message.info('添加成功');
    state.status = "init"
},
[createMovie.rejected.type]: (state, action) => {
    message.error('添加失败');
    state.error = action.payload
},
```

## 修改数据

在表格配置项中定义一个编辑按钮，点击时弹出model，设置model的类型为edit，并设置model中表单的初始数据为被点击的表格数据项的数据。在进入页面时，通过useEffect对表单数据进行修改。

```ts
{
  title: '操作',
  align: "center",
  dataIndex: 'operation',
  width: 70,
  render: (_: any, record: movieDatatype) => {
    return  (
        <Button type={"primary"} size={"small"} onClick={() => handleEditRecord(record)} style={{marginBottom:5}}>编辑</Button>
    )
  }
},
```

```ts
const handleEditRecord = (moviesRecord:movieDatatype) => {
    dispatch(setMovieModel({
        isModalVisible:true,
        initFormData:moviesRecord,
        modelType:"edit"
    }))
}
```

```tsx
useEffect(() => {
    if(modelType === "add"){
        form.resetFields()
    }else {
        form.setFieldsValue(moviesRecord)
    }
})
```

在表单中修改完数据后提交触发onFinish函数，给数据项添加上id信息，并派发updateMovie函数。

```tsx
const onFinish =  (values: any) => {
  if(movieModel.modelType === "add"){
      dispatch(createMovie(values))
  }else {
      values.id = movieModel.initFormData.id
      dispatch(updateMovie(values))
      dispatch(setMovieModel({
        isModalVisible:false,
      }))
  }
};
```

```ts
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
```

```ts
[updateMovie.fulfilled.type]: (state, action) => {
    state.status = "init"
    message.info('编辑成功');
},
[updateMovie.rejected.type]: (state, action) => {
    message.error('编辑失败');
},
```

## 搜索功能

通过路由跳转并设置status为init重新获取数据，后端根据url返回被搜索后的数据。

```tsx
<Search placeholder="按照名字搜索" onSearch={onSearch} style={{ width: 200,marginRight:30 }} />
```

```tsx
const onSearch = (value: string) => {
  navigate(`/movies?name=${value}`)
  dispatch(setMoviesStatus("init"))
}
```

## 数据可视化表格

引入antv表格组件，并修改data和config的配置即可。

```ts
export const ColumnChart:React.FC<PropsType> = ({scoreDistribution}) => {
  const data = [
    {
      type: '一星',
      sales: scoreDistribution[2],
    },
    {
      type: '二星',
      sales: scoreDistribution[4],
    },
    {
      type: '三星',
      sales: scoreDistribution[6],
    },
    {
      type: '四星',
      sales: scoreDistribution[8],
    },
    {
      type: '五星',
      sales: scoreDistribution[10],
    }
  ];
  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '评分',
      },
      sales: {
        alias: '数量',
      },
    },
  };
  // @ts-ignore
  return <Column {...config} />;
};

```

```tsx
<BaseBody>
  <Row gutter={20} style={{marginBottom:40}}>
    <Col span={12}>
      <Card title={"评分占比分布图"} bodyStyle={{height:300}}>
        <ColumnChart scoreDistribution={scoreDistribution}/>
      </Card>
    </Col>
    <Col span={12}>
      <Card title={"评分趋势"} bodyStyle={{height:300}}>
        <UserLineChart config={ChartConfig}/>
      </Card>
    </Col>
  </Row>
  <Row gutter={20}>
    <Col span={12}>
      <Card title={"评分占比饼图"} bodyStyle={{height:300}}>
        <PieChart scoreDistribution={scoreDistribution}/>
      </Card>
    </Col>
  </Row>
</BaseBody>
```
