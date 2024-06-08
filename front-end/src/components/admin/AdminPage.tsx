import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';

const { Header, Content, Footer } = Layout;

const items = [
    {
        key: 'account',
        label: 'ACCOUNT',
        route: '/admin/account',
    },
    {
        key: 'staff',
        label: 'STAFF',
        route: '/admin/staff',
    },
    {
        key: 'enterprise',
        label: 'ENTERPRISE',
        route: '/admin/enterprise',
    },
    {
        key: 'candidate',
        label: 'CANDIDATE',
        route: '/admin/candidate',
    },
    {
        key: 'renewal',
        label: 'RENEWAL',
        route: '/admin/renewal',
    },
];

// CSS for component
const headerStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#1890ff',
    color: '#fff',
    fontFamily: 'Inter',
    fontSize: '17px',
    fontWeight: 700,
    lineHeight: '24.2px',
    textAlign: 'left',
};

const menuStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
    backgroundColor: '#1890ff',
    color: '#fff',
    fontFamily: 'Inter',
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: '24.2px',
    textAlign: 'left',
};

const menuItemStyle: React.CSSProperties = { fontWeight: 'bold', background: 'none' };

// Component AdminPage
const AdminPage: React.FC = () => {
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState<string>('account');

    useEffect(() => {
        document.body.style.margin = '0';
    }, []);

    useEffect(() => {
        const pathname = location.pathname;
        const selectedItem = items.find((item) => pathname.startsWith(item.route));
        if (selectedItem) {
            setSelectedKey(selectedItem.key);
        }
    }, [location]);

    return (
        <Layout>
            <Header style={headerStyle}>
                <Link to="/">
                    <img src={logo} alt="logo" style={{ height: '50px' }} />
                </Link>
                <Menu theme="dark" mode="horizontal" selectedKeys={[selectedKey]} style={menuStyle}>
                    {items.map((item) => (
                        <Menu.Item key={item.key} style={menuItemStyle}>
                            <Link to={item.route}>{item.label}</Link>
                        </Menu.Item>
                    ))}
                </Menu>
            </Header>
            <Content style={{ padding: '0 100px' }}>
                <Outlet />
            </Content>
            <Footer style={{ textAlign: 'center' }}>Copyright © 2021 Emphires All Rights Reserved</Footer>
        </Layout>
    );
};

export default AdminPage;
