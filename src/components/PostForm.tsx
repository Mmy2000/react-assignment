import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import api from '../services/api';

const PostForm: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { title: string; body: string }) => {
    setLoading(true);
    try {
      const response = await api.post('/posts', values);
      notification.success({
        message: 'Post Created',
        description: `Post "${response.data.title}" was created successfully.`,
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to create post.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter a title!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Body"
        name="body"
        rules={[{ required: true, message: 'Please enter the body!' }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading}>
        Submit
      </Button>
    </Form>
  );
};

export default PostForm;
