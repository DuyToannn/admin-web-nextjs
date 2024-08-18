'use client'
import { Layout } from 'antd';

const AdminFooter = () => {
    const { Footer } = Layout;

    return (
        <>
            <Footer style={{ textAlign: 'center' }}>
                Duy Toan ©{new Date().getFullYear()} Created by @Duy Toan
            </Footer>
        </>
    )
}

export default AdminFooter;