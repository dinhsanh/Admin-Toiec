import React, { useState } from 'react';
import { HouseDoorFill, Gem, Bookmark, Bell, HddStack, Justify }
    from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { userActions } from '../../Redux/_actions';
import {
    PoweroffOutlined, SearchOutlined, MailOutlined
} from '@ant-design/icons';
import './HeaderPage.css'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import Logoin from '../../Asset/face1.42d41e61.jpg'
import { Layout, Menu, Button, theme } from 'antd';
const { Header, Sider, Content } = Layout;

function HeaderPage({ setCollapsed, collapsed }) {
    const isLoggedIn = useSelector(state => state.authentication.isLoggedIn)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleLogout() {
        dispatch(userActions.logout());
        navigate('/login');
    }
    return (
        <Header
            style={{
                padding: 0,
                background: "white",
                justifyContent: 'space-between',
                display: 'flex'

            }}
        >
            <div className='navbar'>
                <div className='head-nav'>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    ></Button>
                </div>
                <div className='search'>
                    <SearchOutlined />
                    <input type='text' placeholder="Search projects"></input>
                </div>
            </div>

            <div className="items">
                {!isLoggedIn ? (
                    <Link to={"/login"}>
                        <div className="item">
                            Login
                        </div>
                    </Link>
                ) : (
                    <>
                        <div className="div-login">
                            <Link to={'/'}>
                                <div className="item1">
                                    <img src={Logoin} className="item-img" />
                                    <div className="counter" dot></div>
                                </div>
                            </Link>
                            <p>MRsanh</p>
                        </div>

                    </>
                )}
                <div className="item">
                    <MailOutlined className="icon" />
                    <div className="counter1" dot></div>
                </div>
                <div className="item">
                    <Bell className="icon" />
                    <div className="counter2" dot></div>
                </div>
                <div className="item">
                    <PoweroffOutlined className="icon" onClick={handleLogout} />
                </div>
                <div className="item">
                    < HddStack className="icon" />
                </div>
            </div>

        </Header>
    )
}

export default HeaderPage;