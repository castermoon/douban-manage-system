import React from 'react';
import { Line } from '@ant-design/charts';


interface PropsType{
  config:{}
}

export const UserLineChart:React.FC<PropsType> = ({config}) => {
  //@ts-ignore
  return <Line {...config} />;
};

