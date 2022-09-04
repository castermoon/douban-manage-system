import React, {Fragment, useEffect} from "react";
import { Form,Input,Button,Card  } from "antd";
import styles from "./login.module.css"
import { login,loginInfo } from "./loginSlice"
import { useAppDispatch } from "../../store/hook";
import { useNavigate } from "react-router-dom";

const Login: React.FC = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onFinish = (loginInfo: loginInfo) => {
    dispatch(login(loginInfo))
      .then(() => {
        navigate(`/`)
      });
  };

  const onFinishFailed = (errorInfo:any) => {
    console.log(errorInfo);
  };

  return (
    <div className={styles["body"]}>
      <div className={styles["header"]}>电影信息管理系统</div>
      <div className={styles["form-container"]}>
        <Card title="登录">
          <Form
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login
