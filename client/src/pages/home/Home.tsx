import React, {} from "react";
import BaseBody from "../../common/baseBody/BaseBody";
import {Avatar, Card,Row,Col,Statistic} from "antd";
import { UserOutlined,DatabaseOutlined,SmileOutlined } from '@ant-design/icons';
import {useAppSelector} from "../../store/hook";
import {UserLineChart} from "../../common/usersLineChart/UserLineChart";

const data = [
  {
    "Date": "2022-08-01",
    "scales": 1998
  },
  {
    "Date": "2022-08-02",
    "scales": 2010
  },
  {
    "Date": "2022-08-03",
    "scales": 1148
  },
  {
    "Date": "2022-08-04",
    "scales": 1635
  },
  {
    "Date": "2022-08-05",
    "scales": 2456
  },
  {
    "Date": "2022-08-06",
    "scales": 3667
  },
  {
    "Date": "2022-08-07",
    "scales": 2502
  },
  {
    "Date": "2022-08-08",
    "scales": 1987
  },
  {
    "Date": "2022-08-09",
    "scales": 2222
  },
]
const ChartConfig = {
  data,
  padding: 'auto',
  xField: 'Date',
  yField: 'scales',
  xAxis: {
    // type: 'timeCat',
    tickCount: 5,
  },
};


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
      <Card title={"用户访问量折线图"} style={{marginTop:20}} bodyStyle={{height:"300px"}}>
        <UserLineChart config={ChartConfig}/>
      </Card>
    </BaseBody>
  );
};
