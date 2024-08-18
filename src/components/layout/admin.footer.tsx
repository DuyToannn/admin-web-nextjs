'use client'
import React from 'react'
import { Layout } from 'antd';

const AdminFooter = () => {
    const { Footer } = Layout;
    return (
        <Footer style={{ textAlign: 'center' }}>
            Duy Toan ©{new Date().getFullYear()} Created by @DuyToan
        </Footer>
    )
}

export default AdminFooter