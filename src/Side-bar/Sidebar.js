import React, { useState } from 'react';
import './sidebar.css'
import {
    BulbOutlined, FacebookOutlined, DollarOutlined, ReadOutlined, FileOutlined, ContactsOutlined, DatabaseOutlined
} from '@ant-design/icons';
import { HouseDoorFill } from 'react-bootstrap-icons';
import Logoin from '../Asset/Screenshot 2023-07-21 123001.png'
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
function Sidebar({ collapsed }) {
    const navigate = useNavigate();
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="Sidebar" />
            <div className='logotop'>
                <img src={Logoin} alt='' className="logotoiec" />
            </div>
            <Menu
                onClick={(item) => {
                    navigate(item.key);
                }}
                mode='inline'
                items={[
                    {
                        label: "Home",
                        icon: <HouseDoorFill />,
                        key: '/homepage',
                    },
                    {
                        label: "Practice L&R",
                        icon: <DatabaseOutlined />,
                        key: '/Practice L&R',
                        children:[
                            {
                            label: 'Part 1: Photo',
                            key:'/photo',
                        },{
                            label: 'Part 2: Question-Response',
                            key :'/question-response',
                        },{
                            label: 'Part 3: Conversations',
                            key:'/conversations',
                        },{
                            label: 'Part 4: Short Talk',
                            key:'/short talk',
                        },{
                            label: 'Part 5: Incomplete Sentences',
                            key:'/incomplete sentences',
                        },{
                            label: 'Part 6: Text Completion',
                            key:'text completion',
                        }
                    ]
                    },
                    {
                        label: "Practice S&W",
                        icon: <ContactsOutlined />,
                        key: '/Practice S&W',
                    },
                    {
                        label: "Test",
                        icon: <FileOutlined />,
                        key: '/Test',
                        children:[
                            {
                            label: 'Simulation Test',
                            key:'/simualation test',
                        },{
                            label: 'Full Test',
                            key :'/full test',
                        },{
                            label: 'Mini Test',
                            key :'/mini test',
                        }
                    ]
                    },
                    {
                        label: "Grammar",
                        icon: <ReadOutlined />,
                        key: '/Grammar',
                    },
                    {
                        label: "Vocabulary",
                        icon: <DollarOutlined />,
                        key: '/vocabulary',
                        children :[
                            {
                                label:'Topic Vocabulary',
                                key: '/topicvocabulary'
                            },  {
                                label:'All Vocabulary',
                                key: '/allvocabulary'
                            }, 
                        ] 
                        
                    },
                    {
                        label: "Blog",
                        icon: <FacebookOutlined />,
                        key: '/Blog',
                    },
                    {
                        label: "TOEIC Tips",
                        icon: <BulbOutlined />,
                        key: '/TOEIC Tips',
                        children:[
                            {
                            label: 'TOEIC Listening Tips',
                            key:'/toeic listening tips',
                        },{
                            label: 'TOEIC Reading Tips',
                            key :'/toeic reading tips',
                        },
                    ]
                    }
                ]}>

            </Menu>
        </Sider>
    )
}
export default Sidebar