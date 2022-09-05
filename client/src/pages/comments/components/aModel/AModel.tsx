import {Button, Form, Modal,Input,InputNumber } from "antd";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../store/hook";
import {createData, setIsModalVisible, setModelType, updateData} from "../../commentsSlice";
import styles from "./aModel.module.css"



const AModel: React.FC = () => {
  const isModalVisible = useAppSelector(state => state.comments.isModalVisible)
  const modelType = useAppSelector(state => state.comments.modelType)
  const dispatch = useAppDispatch()
  const record = useAppSelector(state => state.comments.record)
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
            label="评论者id"
            name="user_id"
            rules={[{ required: true, message: '请输入评论者id!' }]}
            className={styles["input"]}
          >
            <InputNumber style={{width:345}}/>
          </Form.Item>
          <Form.Item
            label="电影id"
            name="movie_id"
            rules={[{ required: true, message: '输入电影id!' }]}
            className={styles["input"]}
          >
            <InputNumber style={{width:345}}/>
          </Form.Item>
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入标题!' }]}
            className={styles["input"]}
          >
            <Input allowClear/>
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '输入内容!' }]}
            className={styles["input"]}
          >
            <Input allowClear/>
          </Form.Item>
          <Form.Item
            label="评分"
            name="score"
            rules={[{ required: true, message: '请输入评分!' }]}
            className={styles["input"]}
          >
            <InputNumber style={{width:345}}/>
          </Form.Item>
          <Form.Item
            label="日期"
            name="date"
            className={styles["input"]}
          >
            <InputNumber style={{width:345}}/>
          </Form.Item>
          <Form.Item
            label="是否看过"
            name="status"
            className={styles["input"]}
          >
            <InputNumber style={{width:345}}/>
          </Form.Item>
          <Form.Item
            label="是否分享"
            name="isShare"
            className={styles["input"]}
          >
            <InputNumber style={{width:345}}/>
          </Form.Item>
          <Form.Item
            label="标签"
            name="labelList"
            className={styles["input"]}
          >
            <Input allowClear/>
          </Form.Item>
          <Form.Item
            label="是否仅自己可见"
            name="onlyMe"
            className={styles["input"]}
          >
            <InputNumber style={{width:345}}/>
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
