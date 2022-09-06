import {Button, Form, Modal, Input, InputNumber, Select} from "antd";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../store/hook";
import {createData, setIsModalVisible, setModelType, updateData} from "../../slice";
import styles from "./aModel.module.css"
import {useSearchParams} from "react-router-dom";



const AModel: React.FC = () => {
  const isModalVisible = useAppSelector(state => state.movieRelation.isModalVisible)
  const modelType = useAppSelector(state => state.movieRelation.modelType)
  const dispatch = useAppDispatch()
  const record = useAppSelector(state => state.movieRelation.record)
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams()
  const movie_id = searchParams.get("movie_id")
  const celebrity_id = searchParams.get("celebrity_id")
  const { Option } = Select

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
      form.setFieldValue("movie_id",movie_id)
      form.setFieldValue("celebrity_id",celebrity_id)
    }else {
      form.setFieldsValue(record)
    }
  })


  return (
    <>
      <Button type="primary" onClick={handleCreate} style={{ float:"right",marginRight:20 }}>新增关联</Button>
      {/*@ts-ignore*/}
      <Modal title="新增关联" open={isModalVisible} footer={null} width={1000}  onCancel={handleCancel} forceRender  >
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
            label="电影ID"
            name="movie_id"
            rules={[{ required: true, message: '请输入电影ID!' }]}
            className={styles["input"]}
          >
            { movie_id ? <InputNumber disabled/> : <InputNumber/> }
          </Form.Item>
          <Form.Item
            label="人物ID"
            name="celebrity_id"
            rules={[{ required: true, message: '请输入人物ID!' }]}
            className={styles["input"]}
          >
            { celebrity_id ? <InputNumber disabled/> : <InputNumber/> }
          </Form.Item>
          <Form.Item
            label="职位"
            name="position"
            rules={[{ required: true, message: '请输入职位!' }]}
            className={styles["input"]}
          >
            <Select style={{ width: 120 }}>
              <Option value="author">编剧</Option>
              <Option value="toStar">主演</Option>
              <Option value="director">导演</Option>
            </Select>
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
