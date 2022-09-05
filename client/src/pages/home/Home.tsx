import React, {} from "react";
import BaseBody from "../../common/baseBody/BaseBody";
import {Avatar, Card,Row,Col,Statistic} from "antd";
import { UserOutlined,DatabaseOutlined,SmileOutlined } from '@ant-design/icons';
import {useAppSelector} from "../../store/hook";
import {UserLineChart} from "./components/usersLineChart/UserLineChart";

export const Home: React.FC = (props) => {
  const userInfo = useAppSelector(state => state.login.userInfo)
  return (
    <BaseBody>
      <Row gutter={20} style={{marginBottom:10}}>
        <Col span={8}>
          <Card>
            <Avatar size={64} shape="square" icon={<UserOutlined />} src={"https://i.postimg.cc/yxMQQrWN/image.jpg"}/>
            <h1 style={{float:"right",marginTop:"20px"}}>{userInfo ? userInfo.nickname : "未登录"}</h1>
            <hr/>
            <div style={{fontSize:13,lineHeight:"30px"}}>
              <div>
                <div>上次登录时间:<span style={{float:"right"}}>2022-09-05</span></div>
              </div>
              <div>
                <div>上次登录地点:<span style={{float:"right"}}>广东</span></div>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={16}>
          <Card>
            <Row gutter={16}>
              <Col span={8}>
                <Card title={"电影网站后端项目"}>
                  <a href="https://github.com/castermoon/koa2-douban">koa2-douban</a>
                </Card>
              </Col>
              <Col span={8}>
                <Card title={"电影网站前端项目"}>
                  <a href="https://github.com/castermoon/douban-react">douban-react</a>
                </Card>
              </Col>
              <Col span={8}>
                <Card title={"电影网站后台管理系统"}>
                  <a href="https://github.com/castermoon/douban-manage-system">douban-manage-system</a>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={8}>
          <Card><Statistic title="今日用户访问量" value={112893} prefix={<UserOutlined />}/></Card>
        </Col>
        <Col span={8}>
          <Card><Statistic title="电影总量" value={112893} prefix={<DatabaseOutlined />}/></Card>
        </Col>
        <Col span={8}>
          <Card><Statistic title="人物总量" value={112893} prefix={<SmileOutlined />}/></Card>
        </Col>
      </Row>
      <UserLineChart/>
    </BaseBody>
  );
};
