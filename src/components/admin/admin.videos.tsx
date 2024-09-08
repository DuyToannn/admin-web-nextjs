'use client'
import React from 'react'
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
    key: string;
    name: string;
    age: number;
    thumbnail: string;
    category: string;
    duration: string;
    createdAt: string;
    type: string;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Thumbnail',
        dataIndex: 'thumbnail',
        key: 'thumbnail',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Tên video',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Danh mục',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Thời lượng',
        key: 'duration',
        dataIndex: 'duration',

    },
    {
        title: 'Ngày tạo',
        key: 'createdAt',
        dataIndex: 'createdAt',
    },
    {
        title: 'Loại video',
        key: 'type',
        dataIndex: 'type',
    },
    {
        title: 'Hành động',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Button style={{
                    backgroundColor: '#6A9C89',
                    color: '#E9EFEC',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '5px 15px',
                    transition: 'all 0.3s',
                    height: '20px',
                }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16423C'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6A9C89'}>
                    Xem
                </Button>
                <Button style={{
                    backgroundColor: '#6A9C89',
                    color: '#E9EFEC',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '5px 15px',
                    transition: 'all 0.3s',
                    height: '20px',
                }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16423C'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6A9C89'}>
                    M3u8
                </Button>
                <Button style={{
                    backgroundColor: '#6A9C89',
                    color: '#E9EFEC',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '5px 15px',
                    transition: 'all 0.3s',
                    height: '20px',
                }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16423C'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6A9C89'}>
                    Embed
                </Button>
                <Button style={{
                    backgroundColor: '#6A9C89',
                    color: '#E9EFEC',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '5px 15px',
                    transition: 'all 0.3s',
                    height: '20px',
                }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16423C'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6A9C89'}>
                    Sửa
                </Button>
                <Button style={{
                    backgroundColor: '#C4DAD2',
                    color: '#16423C',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '5px 15px',
                    transition: 'all 0.3s',
                    height: '20px',
                }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#16423C';
                        e.currentTarget.style.color = '#E9EFEC';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#C4DAD2';
                        e.currentTarget.style.color = '#16423C';
                    }}>
                    Xóa
                </Button>
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        thumbnail: 'https://via.placeholder.com/150',
        category: 'Category 1',
        duration: '10:00',
        createdAt: '2021-01-01',
        type: 'Video 1',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        thumbnail: 'https://via.placeholder.com/150',
        category: 'Category 2',
        duration: '10:00',
        createdAt: '2021-01-01',
        type: 'Video 2',


    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        thumbnail: 'https://via.placeholder.com/150',
        category: 'Category 3',
        duration: '10:00',
        createdAt: '2021-01-01',
        type: 'Video 3',
    },
];

const VideoPage: React.FC = () => <Table columns={columns} dataSource={data} />;

export default VideoPage;