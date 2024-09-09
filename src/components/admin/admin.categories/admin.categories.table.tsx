'use client'
import React, { useState } from 'react'
import { Space, Table, Button, Popconfirm, message } from 'antd';
import type { TableProps } from 'antd';
import { DeleteTwoTone, EditTwoTone, EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import AdminCategoriesAdd from './admin.categories.add';
import AdminCategoriesEdit from './admin.categories.edit';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { handleDeleteCategoryAction } from '@/utils/actions';
import { Tag } from 'antd';
import { handleToggleCategoryAction } from '@/utils/actions';
interface IProps {
    categories: any[];
    meta: {
        current: number;
        pageSize: number;
        pages: number;
        total: number;
    }
}

const AdminCategories = (props: IProps) => {
    const { categories, meta } = props;
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<any>(null);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const columns: TableProps<any>['columns'] = [
        {
            title: 'STT',
            key: 'index',
            width: 50,
            align: 'center',
            render: (text, record, index) => (
                <span>{(meta.current - 1) * meta.pageSize + index + 1}</span>
            ),
        },
        {
            title: 'Danh mục',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: 200,
            render: (description: string) => (
                <span>
                    {description.length > 50 ? `${description.slice(0, 50)}...` : description}
                </span>
            ),
        },
        {
            title: 'Số lượng video',
            dataIndex: 'totalVideos',
            key: 'totalVideos',
            align: 'center',
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
            title: 'Trạng thái',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (isActive: boolean) => (
                <Tag color={isActive ? 'green' : 'red'}>
                    {isActive ? 'Đã kích hoạt' : 'Đã ẩn'}
                </Tag>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EditTwoTone
                        onClick={() => {
                            setIsUpdateModalOpen(true);
                            setDataUpdate(record);
                        }}
                        twoToneColor="#f57800"
                        style={{ cursor: "pointer" }}
                    />
                    <Popconfirm
                        placement="leftTop"
                        title={"Xác nhận xóa danh mục"}
                        description={"Bạn có chắc chắn muốn xóa danh mục này ?"}
                        onConfirm={() => handleDeleteCategory(record._id)}
                        okText="Xác nhận"
                        cancelText="Hủy"
                    >
                        <DeleteTwoTone twoToneColor="#ff4d4f" style={{ cursor: "pointer" }} />
                    </Popconfirm>
                    {record.isActive ? (
                        <EyeInvisibleOutlined
                            onClick={() => handleToggleCategory(record._id)}
                            style={{ cursor: "pointer", color: "#1890ff" }}
                        />
                    ) : (
                        <EyeOutlined
                            onClick={() => handleToggleCategory(record._id)}
                            style={{ cursor: "pointer", color: "#52c41a" }}
                        />
                    )}
                </Space>
            ),
        },
    ];

    const handleDeleteCategory = async (id: string) => {
        const res = await handleDeleteCategoryAction(id)
        if (res?.data) {
            message.success("Xóa danh mục thành công")
        } else {
            message.error("Xóa danh mục thất bại")
        }
    }

    const onChange = (pagination: any) => {
        if (pagination && pagination.current) {
            const params = new URLSearchParams(searchParams);
            params.set('current', pagination.current);
            replace(`${pathname}?${params.toString()}`);
        }
    };

    const handleToggleCategory = async (id: string) => {
        const res = await handleToggleCategoryAction(id)
        if (res?.data) {
            message.success("Cập nhật trạng thái danh mục thành công")
        } else {
            message.error("Cập nhật trạng thái danh mục thất bại")
        }
    }
    return (
        <div style={{ position: 'relative' }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20
            }}>
                <span>Quản lý danh mục</span>
                <Button
                    style={{
                        backgroundColor: '#6A9C89',
                        color: '#FFFFFF',
                        border: 'none',
                    }}
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    Thêm danh mục
                </Button>
            </div>
            <Table
                bordered
                columns={columns}
                dataSource={categories}
                rowKey="_id"
                pagination={{
                    current: meta.current,
                    pageSize: meta.pageSize,
                    total: meta.total,
                    showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} mục`,
                }}
                onChange={onChange}
            />

            <AdminCategoriesAdd
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
            />
            <AdminCategoriesEdit
                isCreateModalOpen={isUpdateModalOpen}
                setIsCreateModalOpen={setIsUpdateModalOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </div>
    )
};

export default AdminCategories;