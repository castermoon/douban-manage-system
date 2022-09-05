import {Button, Form, Modal,Input,InputNumber } from "antd";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../store/hook";
import {createLongComment, setIsModalVisible, setModelType, updateLongComment} from "../../longCommentsSlice";
import styles from "./aModel.module.css"



const AModel: React.FC = () => {
  const isModalVisible = useAppSelector(state => state.longComments.isModalVisible)
  const modelType = useAppSelector(state => state.longComments.modelType)
  const dispatch = useAppDispatch()
  const longCommentsRecord = useAppSelector(state => state.longComments.longCommentsRecord)
  const [form] = Form.useForm();
  const handleCancel = () => {
    dispatch(setIsModalVisible(false))
  };

  const handleCreateLongComment =  () => {
    dispatch(setIsModalVisible(true))
    dispatch(setModelType("add"))
  }


  const onFinish =  (values: any) => {
    if(modelType === "add"){
        dispatch(createLongComment(values))
    }else {
        values.id = longCommentsRecord.id
        dispatch(updateLongComment(values))
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
      form.setFieldsValue(longCommentsRecord)
    }
  })


  return (
    <>
      <Button type="primary" onClick={handleCreateLongComment} style={{ float:"right",marginRight:20 }}>新增长评</Button>
      {/*@ts-ignore*/}
      <Modal title="新增电影" open={isModalVisible} footer={null} width={1000}  onCancel={handleCancel} forceRender  >
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
            <InputNumber/>
          </Form.Item>
          <Form.Item
            label="电影id"
            name="movie_id"
            rules={[{ required: true, message: '输入电影id!' }]}
            className={styles["input"]}
          >
            <InputNumber/>
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
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="日期"
            name="date"
            className={styles["input"]}
          >
            <InputNumber/>
          </Form.Item>
          <Form.Item
            label="是否剧透"
            name="spoiler"
            className={styles["input"]}
          >
            <InputNumber/>
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
