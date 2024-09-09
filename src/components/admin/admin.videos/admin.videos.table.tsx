'use client'
import React from 'react'
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { useRouter } from 'next/navigation';
interface DataType {
    key: string;
    name: string;
    thumbnail: string;
    category: string;
    duration: string;
    createdAt: string;
    size: string;
    resolution: string;
    type: string;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Thumbnail',
        dataIndex: 'thumbnail',
        key: 'thumbnail',
        width: '10%',
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
        title: 'Loại video',
        key: 'type',
        dataIndex: 'type',
        render: (type: string) => (
            <Tag color={type === 'movie' ? 'blue' : 'green'}>
                {type === 'movie' ? 'Phim lẻ' : 'Phim bộ'}
            </Tag>
        ),
    },
    {
        title: 'Thời lượng',
        key: 'duration',
        dataIndex: 'duration',
        render: (duration: string) => {
            // Ensure the duration is in the format 00:00:00
            const formattedDuration = duration.length === 8 ? duration : '00:00:00';
            return <span>{formattedDuration}</span>;
        },
    },
    {
        title: 'Kích thước',
        key: 'size',
        dataIndex: 'size',
    },
    {
        title: 'Chất lượng',
        key: 'resolution',
        dataIndex: 'resolution',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (createdAt: string) => {
            const date = new Date(createdAt);
            return date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        },
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
        thumbnail: 'https://via.placeholder.com/150',
        category: 'Category 1',
        duration: '01:00:00',
        createdAt: '2021-01-01',
        type: 'series',
        size: '100MB',
        resolution: '1080p',
    },
    {
        key: '2',
        name: 'Jim Green',
        thumbnail: 'https://via.placeholder.com/150',
        category: 'Category 2',
        duration: '01:00:00',
        createdAt: '2021-01-01',
        type: 'series',
        size: '100MB',
        resolution: '1080p',
    },
    {
        key: '3',
        name: 'Joe Black',
        thumbnail: 'https://via.placeholder.com/150',
        category: 'Category 3',
        duration: '01:00:00',
        createdAt: '2021-01-01',
        type: 'movie',
        size: '100MB',
        resolution: '1080p',
    },
];

const VideoPage: React.FC = () => {
    const router = useRouter();
    return (
        <>
            <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20
            }}>
                <span>Danh sách video</span>
                <Button onClick={() => router.push('/dashboard/videos/add')} style={{

                    backgroundColor: '#6A9C89',
                    color: '#FFFFFF',

                    top: '10px',
                    right: '10px',
                    zIndex: 1
                }}>Thêm Video</Button>
            </div>
            <Table bordered columns={columns} dataSource={data} />
        </>
    );
};

export default VideoPage;