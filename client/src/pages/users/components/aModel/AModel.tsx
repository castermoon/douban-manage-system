import {Button, Form, Modal,Input } from "antd";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../store/hook";
import {createData, setIsModalVisible, setModelType, updateData} from "../../slice";
import styles from "./aModel.module.css"



const AModel: React.FC = () => {
  const isModalVisible = useAppSelector(state => state.users.isModalVisible)
  const modelType = useAppSelector(state => state.users.modelType)
  const dispatch = useAppDispatch()
  const record = useAppSelector(state => state.users.record)
  const [form] = Form.useForm();
  const handleCancel = () => {
    dispatch(setIsModalVisible(false))
  };

  const handleCreate =  () => {
    dispatch(setIsModalVisible(true))
    dispatch(setModelType("add"))
  }


  const onFinish =  (values: any) => {
    if(modelType === "add"){
        dispatch(createData(values))
    }else {
        values.id = record.id
        dispatch(updateData(values))
        dispatch(setIsModalVisible(false))
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if(modelType === "add"){
      form.resetFields()
    }else {
      form.setFieldsValue(record)
    }
  })


  return (
    <>
      <Button type="primary" onClick={handleCreate} style={{ float:"right",marginRight:20 }}>新增短评</Button>
      {/*@ts-ignore*/}
      <Modal title="新增电影" visible={isModalVisible} footer={null} width={1000}  onCancel={handleCancel} forceRender  >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{overflow:"hidden"}}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
            className={styles["input"]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
            className={styles["input"]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label="昵称"
            name="nickname"
            rules={[{ required: true, message: '请输入昵称!' }]}
            className={styles["input"]}
          >
            <Input allowClear/>
          </Form.Item>
          <Form.Item className={styles["submit"]} >
            <Button type="primary" htmlType="submit" >
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AModel;
