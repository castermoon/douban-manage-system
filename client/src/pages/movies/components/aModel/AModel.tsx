import {Button, Form, Modal,Input } from "antd";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../store/hook";
import {createMovie, setMovieModel , updateMovie} from "../../slice";
import styles from "./aModel.module.css"



const AModel: React.FC = () => {
  const dispatch = useAppDispatch()
  const movieModel = useAppSelector(state => state.movies.model)
  const [form] = Form.useForm();
  const handleCancel = () => {
    dispatch(setMovieModel({
      isModalVisible:false
    }))
  };

  const handleCreateMovie =  () => {
    dispatch(setMovieModel({
      modelType:"add",
      isModalVisible:true,
    }))
  }


  const onFinish =  (values: any) => {
    if(movieModel.modelType === "add"){
        dispatch(createMovie(values))
    }else {
        values.id = movieModel.initFormData.id
        dispatch(updateMovie(values))
        dispatch(setMovieModel({
          isModalVisible:false,
        }))
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if(movieModel.modelType === "add"){
      form.resetFields()
    }else {
      form.setFieldsValue(movieModel.initFormData)
    }
  })


  return (
    <>
      <Button type="primary" onClick={handleCreateMovie} style={{ float:"right",marginRight:20 }}>新增电影</Button>
      {/*@ts-ignore*/}
      <Modal title="新增电影" open={movieModel.isModalVisible} footer={null} width={1000}  onCancel={handleCancel} forceRender  >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 20 }}
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
            label="类型"
            name="type"
            rules={[{ required: true, message: '输入类型!' }]}
            className={styles["input"]}
          >
            <Input allowClear  />
          </Form.Item>
          <Form.Item
            label="语言"
            name="language"
            rules={[{ required: true, message: '输入语言!' }]}
            className={styles["input"]}
          >
            <Input allowClear  />
          </Form.Item>
          <Form.Item
            label="评分"
            name="score"
            rules={[{ required: true, message: '请输入评分!' }]}
            className={styles["input"]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label="别名"
            name="anotherName"
            rules={[{ required: false, message: '请输入别名!' }]}
            className={styles["input"]}
          >
            <Input allowClear  />
          </Form.Item>
          <Form.Item
            label="官网"
            name="web"
            rules={[{ required: false, message: '请输入官网!' }]}
            className={styles["input"]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label="时长"
            name="timeLen"
            rules={[{ required: false, message: '请输入时长!' }]}
            className={styles["input"]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label="封面"
            name="cover"
            rules={[{ required: false, message: '请输入封面地址!' }]}
            className={styles["input"]}
          >
            <Input allowClear  />
          </Form.Item>
          <Form.Item
            label="国家"
            name="country"
            rules={[{ required: false, message: '请输入国家!' }]}
            className={styles["input"]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label="indbLink"
            name="indbLink"
            rules={[{ required: false, message: '请输入indbLink!' }]}
            className={styles["input"]}
          >
            <Input allowClear  />
          </Form.Item>
          <Form.Item
            label="日期"
            name="time"
            rules={[{ required: false, message: '请输入日期!' }]}
            className={styles["input"]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label="简介"
            name="brief"
            rules={[{ required: false, message: '请输入简介!' }]}
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
