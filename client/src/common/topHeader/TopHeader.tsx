import { Avatar,Dropdown,Space,Menu  } from 'antd';
import React, { useState } from 'react';
import styles from "./topheader.module.css"
import ABreadcrumb from "../aBreadcrumb/ABreadcrumb";
import { UserOutlined,DownOutlined } from '@ant-design/icons';

const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            首页
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            注销
          </a>
        ),
        // icon: <SmileOutlined />,
      }
    ]}
  />
);

const TopHeader: React.FC = () => {
  return (
    <div className={styles["header"]}>
      <ABreadcrumb/>
      <div className={styles["users"]}>
        <Avatar size="small" icon={<UserOutlined />} style={{marginRight:"3px"}}/>
        <Dropdown overlay={menu}>
          <a onClick={e => e.preventDefault()}>
            <DownOutlined/>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default TopHeader;
