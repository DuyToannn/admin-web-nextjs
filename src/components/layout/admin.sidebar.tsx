'use client'
import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import {
    AppstoreOutlined,
    SettingOutlined,
    TeamOutlined,
    DropboxOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import React, { useContext } from 'react';
import { AdminContext } from "@/library/admin.context";
import type { MenuProps } from 'antd';
import Link from 'next/link'

type MenuItem = Required<MenuProps>['items'][number];
const AdminSideBar = () => {
    const { Sider } = Layout;
    const { collapseMenu } = useContext(AdminContext)!;

    const items: MenuItem[] = [

        {
            key: 'grp',
            label: 'Duy Toàn',
            type: 'group',
            children: [
                {
                    key: "dashboard",
                    label: <Link href={"/dashboard"}>Tổng quan</Link>,
                    icon: <AppstoreOutlined />,
                },
                {
                    key: "users",
                    label: <Link href={"/dashboard/user"}>Quản lý thành viên</Link>,
                    icon: <TeamOutlined />,
                },
                {
                    key: "categories",
                    label: <Link href={"/dashboard/categories"}>Quản lý danh mục</Link>,
                    icon: <AppstoreOutlined />,
                },
                {
                    key: "video",
                    label: <Link href={"/dashboard/videos"}>Quản lý video</Link>,
                    icon: <VideoCameraOutlined />,
                },
                {
                    key: 'sub1',
                    label: 'Cài đặt',
                    icon: <SettingOutlined />,
                    children: [
                        {
                            key: 'g1',
                            type: 'group',
                            children: [
                                {
                                    key: '1',
                                    label: <Link href={"/dashboard/dropbox"}>Dropbox</Link>,
                                    icon: <DropboxOutlined />,
                                },
                            ],
                        },
                    ],
                },
                {
                    type: 'divider',
                },
            ],
        },
    ];

    return (
        <Sider
            collapsed={collapseMenu}
        >

            <Menu
                mode="inline"
                defaultSelectedKeys={['dashboard']}
                items={items}
                style={{ height: '100vh' }}
            />
        </Sider>
    )
}

export default AdminSideBar;