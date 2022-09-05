import {Button, Form, Modal,Input,Select,InputNumber } from "antd";
import React, {useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import {addMovieRelation, setAddRelationModelVisible} from "../../slice";
import styles from "./aModel.module.css"
import {message} from "_antd@4.23.0@antd";

const { Option } = Select;

export const AddRelationModel: React.FC = () => {
  const addRelationModelVisible = useAppSelector(state => state.movies.addRelationModelVisible)
  const dispatch = useAppDispatch()
  const addRelationMovieId = useAppSelector(state => state.movies.addRelationMovieId)
  const [form] = Form.useForm();
  const handleCancel = () => {
    dispatch(setAddRelationModelVisible(false))
  };

  const onFinish = (values: any) => {
    dispatch(addMovieRelation(values))
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    form.resetFields()
    form.setFieldValue("movie_id",addRelationMovieId)
  })



  return (
    <>
      {/*@ts-ignore*/}
      <Modal title="添加关联" open={addRelationModelVisible} footer={null} width={1000}  onCancel={handleCancel} forceRender  >
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
            label="人物ID"
            name="celebrity_id"
            rules={[{ required: true, message: '请输入人物ID!' }]}
            className={styles["input"]}
          >
            <InputNumber/>
          </Form.Item>
          <Form.Item
            label="职业"
            name="position"
            rules={[{ required: true, message: '输入职位!' }]}
            className={styles["input"]}
            initialValue={"author"}
          >
            <Select style={{ width: 120 }}>
              <Option value="author">编剧</Option>
              <Option value="toStar">主演</Option>
              <Option value="director">导演</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="电影ID"
            name="movie_id"
            rules={[{ required: true, message: '输入电影ID!' }]}
            className={styles["input"]}
          >
            <Input allowClear  />
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

