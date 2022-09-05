import {Button, Form, Modal,Input } from "antd";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../store/hook";
import {createCelebrity, setIsModalVisible, setModelType, updateCelebrity} from "../../celebritySlice";
import styles from "./aModel.module.css"



const AModel: React.FC = () => {
  const isModalVisible = useAppSelector(state => state.celebrity.isModalVisible)
  const modelType = useAppSelector(state => state.celebrity.modelType)
  const dispatch = useAppDispatch()
  const celebrityRecord = useAppSelector(state => state.celebrity.celebrityRecord)
  const [form] = Form.useForm();
  const handleCancel = () => {
    dispatch(setIsModalVisible(false))
  };

  const handleCreateMovie =  () => {
    dispatch(setIsModalVisible(true))
    dispatch(setModelType("add"))
  }


  const onFinish =  (values: any) => {
    if(modelType === "add"){
        dispatch(createCelebrity(values))
    }else {
        values.id = celebrityRecord.id
        dispatch(updateCelebrity(values))
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
      form.setFieldsValue(celebrityRecord)
    }
  })


  return (
    <>
      <Button type="primary" onClick={handleCreateMovie} style={{ float:"right",marginRight:20 }}>新增人物</Button>
      {/*@ts-ignore*/}
      <Modal title="新增人物" open={isModalVisible} footer={null} width={1000}  onCancel={handleCancel} forceRender  >
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
            label="名字"
            name="name"
            rules={[{ required: true, message: '请输入名字!' }]}
            className={styles["input"]}
          >
            <Input allowClear  />
          </Form.Item>
          <Form.Item
            label="头像"
            name="icon"
            className={styles["input"]}
          >
            <Input allowClear  />
          </Form.Item>
          <Form.Item
            label="性别"
            name="sex"
            className={styles["input"]}
          >
            <Input allowClear  />
          </Form.Item>
          <Form.Item
            label="职业"
            name="vocation"
            className={styles["input"]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label="星座"
            name="constellation"
            className={styles["input"]}
          >
            <Input allowClear  />
          </Form.Item>
          <Form.Item
            label="出生日期"
            name="birth"
            className={styles["input"]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label="别名"
            name="anotherName"
            className={styles["input"]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label="其他中文名"
            name="anotherChineseName"
            className={styles["input"]}
          >
            <Input allowClear  />
          </Form.Item>
          <Form.Item
            label="indbLink"
            name="indbLink"
            className={styles["input"]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label="官网"
            name="web"
            className={styles["input"]}
          >
            <Input allowClear  />
          </Form.Item>
          <Form.Item
            label="简介"
            name="desc"
            className={styles["input"]}
          >
            <Input.TextArea />
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
