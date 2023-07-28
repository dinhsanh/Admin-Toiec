import React, { useState } from 'react';
import { Layout} from 'antd';
import Vocabulary from '../Vocabulary/AllVocabulary';
import Testpage from '../Testpage/Testpage';
const { Header, Sider, Content } = Layout;
function MainPage() {
    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 600,
                background: "grow",
                color: "grow",
                
            }}
        >
        </Content>
    )
}
export default MainPage;