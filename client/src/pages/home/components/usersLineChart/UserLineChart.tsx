import React from 'react';
import { Card } from "antd"
import { Line } from '@ant-design/charts';

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

export const UserLineChart = () => {


  const config = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
  };

  return (
      <Card title={"用户访问量折线图"} style={{marginTop:20}} bodyStyle={{height:"300px"}}>
        {/*@ts-ignore*/}
        <Line {...config} />;
      </Card>
    )
};

