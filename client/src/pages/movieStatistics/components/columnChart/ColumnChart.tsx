import React from "react";
import { Column } from '@ant-design/plots';

interface scoreDistributionType{
  2:number,
  4:number,
  6:number,
  8:number,
  10:number
}


interface PropsType{
  scoreDistribution:scoreDistributionType
}

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
