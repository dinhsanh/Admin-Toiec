import React, { useState } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
import HeaderPage from '../page/HeaderPage/Headerpage';
import { Routes, Route} from 'react-router-dom';
import Sidebar from '../Side-bar/Sidebar';
import TopicVocabulary from '../page/Vocabulary/TopicVocabulary';
import HomePage from '../page/HomePage/HomePage';
import LoginPage from '../page/LoginPage/LoginPage';
import AllVocabulary from '../page/Vocabulary/AllVocabulary';
import Create from '../page/Vocabulary/Admin/Create';
const { Header, Footer, Sider, Content } = Layout;

function LayoutPage() {
  const [collapsed, setCollapsed] = useState(false);
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();
  return (

    <Layout>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <HeaderPage setCollapsed={setCollapsed} collapsed={collapsed} />
        <Content  >
          <Routes>
            <Route path="/create" element={<Create />} />
            <Route path="/topicvocabulary" element={<TopicVocabulary />} />
            <Route path="/allvocabulary" element={<AllVocabulary />} />
            <Route path="/homepage" element={<HomePage />} />
          </Routes>

        </Content>
        {/* <Footer >Footer</Footer> */}
      </Layout>
    </Layout>




  )
}

export default LayoutPage;
