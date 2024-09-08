'use client'
import React, { useState } from 'react'
import { Space, Table, Button } from 'antd';
import type { TableProps } from 'antd';
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import AdminCategoriesAdd from './admin.categories.add';
import AdminCategoriesEdit from './admin.categories.edit';

interface DataType {
    key: string;
    name: string;
    description: string;
    totalVideos: number;
    isActive: boolean;
    createdAt: string;
}

const AdminCategories: React.FC = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            render: (text, record, index) => (
                <span>{index + 1}</span>
            ),
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Nội dung',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Số lượng video',
            dataIndex: 'totalVideos',
            key: 'totalVideos',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isActive',
            key: 'isActive',
        },
        {
            title: 'Hành động',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <EditTwoTone onClick={() => setIsUpdateModalOpen(true)} twoToneColor="#f57800" style={{ cursor: "pointer" }} />
                    <DeleteTwoTone onClick={() => { }} twoToneColor="#ff4d4f" style={{ cursor: "pointer" }} />
                    <Button style={{
                        backgroundColor: '#6A9C89',
                        color: '#E9EFEC',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '10px 15px',
                        transition: 'all 0.3s',
                        height: '25px',
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16423C'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6A9C89'}>
                        Kích hoạt
                    </Button>
                </Space>
            ),
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            name: 'John Brown',
            description: 'John Brown',
            totalVideos: 10,
            isActive: true,
            createdAt: '2021-01-01',
        },
        {
            key: '2',
            name: 'Jim Green',
            description: 'Jim Green',
            totalVideos: 10,
            isActive: true,
            createdAt: '2021-01-01',
        },
        {
            key: '3',
            name: 'Joe Black',
            description: 'Joe Black',
            totalVideos: 10,
            isActive: true,
            createdAt: '2021-01-01',
        },
    ];

    return (
        <div style={{ position: 'relative' }}>
            <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20
            }}>
                <span>Quản lý danh mục</span>
                <Button style={{
                    backgroundColor: '#6A9C89',
                    color: '#FFFFFF',
                    border: 'none',
                    top: '10px',
                    right: '10px',
                    zIndex: 1
                }} onClick={() => setIsCreateModalOpen(true)} >Thêm danh mục</Button>
            </div>
            <Table bordered columns={columns} dataSource={data} />

            <AdminCategoriesAdd
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
            />
            <AdminCategoriesEdit
                isCreateModalOpen={isUpdateModalOpen}
                setIsCreateModalOpen={setIsUpdateModalOpen}
            />
        </div>
    )
};

export default AdminCategories