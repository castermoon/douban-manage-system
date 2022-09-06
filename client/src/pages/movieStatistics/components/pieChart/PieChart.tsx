import React from "react";
import { Pie } from '@ant-design/plots';

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

export const PieChart:React.FC<PropsType> = ({scoreDistribution}) => {
  const data = [
    {
      type: '好评',
      value: scoreDistribution[8] + scoreDistribution[10]
    },
    {
      type: '中评',
      value: scoreDistribution[6]
    },
    {
      type: '差评',
      value: scoreDistribution[2] + scoreDistribution[4]
    }
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }:{percent:any}) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  // @ts-ignore
  return <Pie {...config} />;
};

