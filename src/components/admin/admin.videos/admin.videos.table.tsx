'use client'
import React, { useEffect, useState } from 'react'
import { Button, Space, Table, Tag, Image, message, Popconfirm,  } from 'antd';
import type { TableProps } from 'antd';
import { DeleteTwoTone } from "@ant-design/icons";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { handleFindOneCategoryAction, handleDeleteVideoAction } from '@/utils/actions';

interface IProps {
    videos: any[];
    meta: {
        current: number;
        pageSize: number;
        pages: number;
        total: number;
    }
}

const VideoPage = (props: IProps) => {
    const { videos, meta } = props;
    const router = useRouter();
    const [categories, setCategories] = useState<{ [key: string]: string }>({});
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    useEffect(() => {
        const fetchCategories = async () => {
            const categoryIds = Array.from(new Set(videos.map(video => video.category)));
            const categoryData: { [key: string]: string } = {};
            for (const id of categoryIds) {
                if (!categories[id]) {
                    const res = await handleFindOneCategoryAction(id);
                    if (res.data) {
                        categoryData[id] = res.data.name;
                    }
                }
            }
            if (Object.keys(categoryData).length > 0) {
                setCategories(prevCategories => ({ ...prevCategories, ...categoryData }));
            }
        };
        fetchCategories();
    }, [videos, categories]);
    const onChange = (pagination: any) => {
        if (pagination && pagination.current) {
            const params = new URLSearchParams(searchParams);
            params.set('current', pagination.current);
            replace(`${pathname}?${params.toString()}`);
        }
    };
    const handleDeleteVideo = async (id: string) => {
        const res = await handleDeleteVideoAction(id)
        if (res) {
            message.success("Xóa video thành công")
        } else {
            message.error("Xóa video thất bại")
        }
    }
    const columns: TableProps<any>['columns'] = [
        {
            title: 'Thumbnail',
            dataIndex: 'poster',
            key: 'poster',
            width: '10%',
            render: (text) =>
                <Image
                    src={text}
                    alt="poster"
                    width={130}
                    style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '5px' }}
                />
        },
        {
            title: 'Tên video',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Loại video',
            key: 'type_movie',
            dataIndex: 'type_movie',
            render: (type_movie: string) => (
                <Tag color={type_movie === 'movie' ? 'blue' : 'green'}>
                    {type_movie === 'movie' ? 'Phim lẻ' : 'Phim bộ'}
                </Tag>
            ),
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            key: 'category',
            render: (categoryId: string) => categories[categoryId] || categoryId,
        },

        {
            title: 'Thời lượng',
            key: 'duration',
            dataIndex: 'duration',
            render: (duration: number) => {
                const durationInSeconds = Math.round(duration / 1000);
                const hours = Math.floor(durationInSeconds / 3600);
                const minutes = Math.floor((durationInSeconds % 3600) / 60);
                const seconds = durationInSeconds % 60;
                const formattedDuration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                return <span>{formattedDuration}</span>;
            },
        },
        {
            title: 'Kích thước',
            key: 'size',
            dataIndex: 'size',
            render: (size: number) => {
                const sizeInMB = size / (1024 * 1024);
                if (sizeInMB < 1000) {
                    return `${sizeInMB.toFixed(2)} MB`;
                } else {
                    const sizeInGB = sizeInMB / 1024;
                    return `${sizeInGB.toFixed(2)} GB`;
                }
            },
        },
        {
            title: 'Chất lượng',
            key: 'resolution',
            dataIndex: 'resolution',
        },
        {
            title: 'Công khai',
            key: 'isPublic',
            dataIndex: 'isPublic',
            render: (isPublic: boolean) => (
                <Tag color={isPublic ? 'green' : 'red'}>
                    {isPublic ? 'Công khai' : 'Riêng tư'}
                </Tag>
            ),
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
                        height: '25px',
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16423C'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6A9C89'}>
                        Xem
                    </Button>
                    {/* <Button style={{
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
                    </Button> */}
                    <Button
                        style={{
                            backgroundColor: '#6A9C89',
                            color: '#E9EFEC',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '5px 15px',
                            transition: 'all 0.3s',
                            height: '25px',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16423C'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6A9C89'}
                        onClick={() => {
                            const watchUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/watch/${record.uuid}`;
                            navigator.clipboard.writeText(watchUrl);
                            message.success('Đã sao chép đường dẫn xem video');
                        }}
                    >
                        Embed
                    </Button>
                    <Button style={{
                        backgroundColor: '#6A9C89',
                        color: '#E9EFEC',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '5px 15px',
                        transition: 'all 0.3s',
                        height: '25px',
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16423C'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6A9C89'}>
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa video này?"
                        onConfirm={() => handleDeleteVideo(record._id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button 
                            style={{
                                backgroundColor: '#C4DAD2',
                                color: '#16423C',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '5px 15px',
                                transition: 'all 0.3s',
                                height: '25px',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#16423C';
                                e.currentTarget.style.color = '#E9EFEC';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#C4DAD2';
                                e.currentTarget.style.color = '#16423C';
                            }}
                        >
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

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
            <Table
                bordered

                columns={columns}
                dataSource={videos}
                rowKey="_id"
                pagination={{
                    current: meta.current,
                    pageSize: meta.pageSize,
                    total: meta.total,
                    showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} mục`,
                }}
                onChange={onChange}
            />
        </>
    );
};

export default VideoPage;