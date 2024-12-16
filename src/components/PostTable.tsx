import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { Post } from '../types/Post';
import api from '../services/api';

const PostTable: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await api.get<Post[]>('/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Body', dataIndex: 'body', key: 'body' },
  ];

  return (
    <Table
      dataSource={posts}
      columns={columns}
      rowKey="id"
      loading={loading}
    />
  );
};

export default PostTable;
