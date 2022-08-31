import React, {Fragment, useState} from "react";
import TopHeader from "./components/topHeader/TopHeader";
import CommonMenu from "./components/menu/CommonMenu";
import styles from "./baseBody.module.css"
import {Card} from "antd";
interface PropsType{
  children?:React.ReactNode
}

const BaseBody: React.FC<PropsType> = ({children}) => {
  return (
    <div className={styles["container"]}>
      <CommonMenu/>
      <div className={styles["right-body"]}>
        <TopHeader/>
        <div className={styles["content"]}>
          <Card>
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BaseBody;
