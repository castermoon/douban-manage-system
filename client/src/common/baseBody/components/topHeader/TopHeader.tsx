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
