import { Menu } from 'antd';
import React, {  } from 'react';
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
