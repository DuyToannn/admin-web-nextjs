'use client'

import { CrownOutlined } from "@ant-design/icons"
import { Button, Result } from "antd"
import { useRouter } from 'next/navigation';
const HomePage = () => {
    const router = useRouter()
    return (
        <div style={{ padding: 20 }}>
            <Result
                icon={<CrownOutlined />}
                title="HOME PAGE "
            />
            <Button onClick={() => router.push('/auth/login')}>Đăng nhập</Button>
            <Button onClick={() => router.push('/auth/register')}>Đăng ký</Button>
        </div>

    )
}

export default HomePage;

