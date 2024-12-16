import React from 'react';
import { Layout } from 'antd';
import PostTable from './components/PostTable';
import PostForm from './components/PostForm';

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ color: 'white', fontSize: '20px' }}>React Assignment</Header>
      <Content style={{ padding: '20px' }}>
        <PostForm />
        <PostTable />
      </Content>
    </Layout>
  );
};

export default App;
