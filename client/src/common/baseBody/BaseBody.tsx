import React, {Fragment, useState} from "react";
import TopHeader from "../topHeader/TopHeader";
import CommonMenu from "../menu/CommonMenu";
import styles from "./baseBody.module.css"

interface PropsType{
  children?:React.ReactNode
}

const BaseBody: React.FC<PropsType> = ({children}) => {
  return (
    <div className={styles["container"]}>
      <CommonMenu/>
      <div className={styles["right-body"]}>
        <TopHeader/>
        <div className={styles["content"]}>{children}</div>
      </div>
    </div>
  );
};

export default BaseBody;
