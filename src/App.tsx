import React from 'react';
import { Layout } from 'antd';
import PostTable from './components/PostTable';
import Navbar from './components/Navbar';

const {  Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar />
      <Content style={{ padding: "20px 50px" }} className="grainy-light">
        <PostTable />
      </Content>
    </Layout>
  );
};

export default App;
