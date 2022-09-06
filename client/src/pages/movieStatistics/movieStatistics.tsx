import React, {useEffect, useState} from "react";
import BaseBody from "../../common/baseBody/BaseBody";
import { ColumnChart } from "./components/columnChart/ColumnChart"
import axios from "axios"
import { useSearchParams } from "react-router-dom";
import {UserLineChart} from "../../common/usersLineChart/UserLineChart";
import {Card, Col, Row} from "antd";
import {PieChart} from "./components/pieChart/PieChart";

interface scoreDistributionType{
  2:number,
  4:number,
  6:number,
  8:number,
  10:number
}

const data = [
  {
    "Date": "2022-08-01",
    "score": 8
  },
  {
    "Date": "2022-08-02",
    "score": 8.2
  },
  {
    "Date": "2022-08-03",
    "score": 7.6
  },
  {
    "Date": "2022-08-04",
    "score": 8.1
  },
  {
    "Date": "2022-08-05",
    "score": 8.9
  },
  {
    "Date": "2022-08-06",
    "score": 8.5
  },
  {
    "Date": "2022-08-07",
    "score": 8.6
  },
  {
    "Date": "2022-08-08",
    "score": 8.7
  },
  {
    "Date": "2022-08-09",
    "score": 8.6
  }
]
const ChartConfig = {
  data,
  padding: 'auto',
  xField: 'Date',
  yField: 'score',
  xAxis: {
    // type: 'timeCat',
    tickCount: 5,
  },
};

export const MovieStatistics: React.FC = (props) => {
  const [ searchParams ] = useSearchParams()
  const movie_id = searchParams.get("movie_id")
  const [scoreDistribution,setScoreDistribution] = useState({} as scoreDistributionType)

  useEffect(()=>{
    axios.get(`/api/getMovieStatistics?movie_id=${movie_id}`)
      .then((res:any) => {
        setScoreDistribution(res.data.data.scoreDistribution)
      })
  },[movie_id])

  return (
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
  );
};
