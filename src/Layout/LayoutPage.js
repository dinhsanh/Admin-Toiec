import React, { useState } from 'react';
import { Layout } from 'antd';
import HeaderPage from '../page/HeaderPage/Headerpage';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../Side-bar/Sidebar';
import TopicVocabulary from '../page/Vocabulary/TopicVocabulary';
import HomePage from '../page/HomePage/HomePage';
import LoginPage from '../page/LoginPage/LoginPage';
import AllVocabulary from '../page/Vocabulary/AllVocabulary';
import Create from '../page/Vocabulary/Admin/Create';
import Account from '../page/Account/Account';
import Practice from '../page/Practice/Practice';
import Part1Photo from '../page/Practice/FullPart/Part1Photo';
import PracticeListen from '../page/Practice/PracticeParts';
import PracticeParts from '../page/Practice/PracticeParts';
import Footer from '../page/Footer/Footer';
const { Header,  Sider, Content } = Layout;

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
            <Route path="/account" element={<Account />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/photo" element={<Part1Photo />} />
            <Route path="/practice_Part/:choose" element={<PracticeParts/>}/>
          </Routes>

        </Content>
        <Footer />
      </Layout>
    </Layout>




  )
}

export default LayoutPage;
