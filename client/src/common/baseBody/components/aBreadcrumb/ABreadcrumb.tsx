import { Alert, Breadcrumb } from 'antd';
import React, { useState } from 'react';
import styles from "./aBreadcrumb.module.css"
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom';

const breadcrumbNameMap: Record<string, string> = {
  '/movies': '电影管理',
  '/celebrity': '人物管理',
  '/comments': '短评',
  '/longComments': '长评',
  '/users': '用户管理'
};



const ABreadcrumb: React.FC = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">首页</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return (
    <Breadcrumb style={{marginTop:5}}>{breadcrumbItems}</Breadcrumb>
  );
};

export default ABreadcrumb;
