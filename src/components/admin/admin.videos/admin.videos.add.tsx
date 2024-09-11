'use client'
import React, { useState, useEffect } from 'react'
import { Button, Divider, Form, Input, Select, Switch, Upload, Row, Col, message, notification } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { handleCreateVideoAction, handleGetCategoryAction, handleUploadImageAction } from '@/utils/actions'

const { Option } = Select

const AdminVideosAdd = () => {
    const [form] = Form.useForm()
    const [categories, setCategories] = useState<any[]>([])
    const [fileList, setFileList] = useState<any[]>([])
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('')

    useEffect(() => {
        const getCategories = async () => {
            const res = await handleGetCategoryAction();
            if (res?.data?.results) {
                const activeCategories = res.data.results.filter((category: any) => category.isActive === true);
                setCategories(activeCategories);
            }
        }
        getCategories();
    }, []);

    const onFinish = async (values: any) => {
        // Convert values to a plain object
        const plainValues = JSON.parse(JSON.stringify(values));
        // Add embed field as a string
        plainValues.embed = '';
        // Ensure poster is a string
        plainValues.poster = plainValues.poster || '';
        // Add new fields
        plainValues.size = 0;
        plainValues.resolution = '';
        plainValues.duration = 0;
        const res = await handleCreateVideoAction(plainValues);
        if (res?.data) {
            message.success("Tạo video thành công")
            form.resetFields();
            setFileList([]);
            setUploadedImageUrl('');
        } else {
            notification.error({
                message: "Create Video error",
                description: res?.message
            })
        }
    }

    const handleUploadImage = async (options: any) => {
        const { file, onSuccess, onError } = options;
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await handleUploadImageAction(formData);
            if (res?.data?.data?.url) {
                const imageUrl = res.data.data.url;
                setUploadedImageUrl(imageUrl);
                form.setFieldsValue({ poster: imageUrl });
                onSuccess("OK");
                message.success("Tải lên hình ảnh thành công");
            } else {
                throw new Error('Không nhận được URL hình ảnh từ server');
            }
        } catch (error: any) {
            onError("Tải lên thất bại");
            notification.error({
                message: "Lỗi khi tải lên",
                description: error.message || "Đã xảy ra lỗi khi tải lên hình ảnh. Vui lòng thử lại sau."
            });
            console.error("Upload error:", error);
        }
    }

    return (
        <>
            <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20
            }}>
                <span>Thêm video</span>
            </div>
            <Divider />
            <Form
                form={form}
                layout="horizontal"
                onFinish={onFinish}
                labelCol={{ span: 4 }}
                labelAlign='left'
            >
                <Row gutter={24}>
                    <Col span={15} style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        marginRight: '20px',
                        borderRadius: '5px'
                    }}>
                        <Form.Item
                            name="title"
                            label="Tiêu đề"
                            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Divider />
                        <Form.Item
                            name="dropbox_url"
                            label="Dropbox URL"
                            rules={[{ required: true, message: 'Vui lòng nhập Dropbox URL!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="poster"
                            label="Hình nền Thumbnail"
                            rules={[{ required: true, message: 'Vui lòng chọn hình nền!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Tải lên hình nền"
                        >
                            <Upload
                                name="file"
                                listType="picture"
                                customRequest={handleUploadImage}
                                maxCount={1}
                                fileList={fileList}
                                onChange={({ fileList }) => setFileList(fileList)}
                            >
                                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                            </Upload>
                        </Form.Item>

                        <Divider />
                        <Form.Item
                            name="isPublic"
                            label="Công khai"
                            valuePropName="checked"
                        >
                            <Switch checkedChildren="True" unCheckedChildren="False" />
                        </Form.Item>
                        <Divider />
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ backgroundColor: '#6A9C89', color: '#FFFFFF', marginTop: 10 }}>
                                Thêm video
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col span={8} style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '5px',
                    }}>
                        <Form.Item
                            name="type_movie"
                            label="Loại phim"
                            rules={[{ required: true, message: 'Vui lòng chọn loại phim!' }]}
                        >
                            <Select>
                                <Option value="movie">Phim lẻ</Option>
                                <Option value="series">Phim bộ</Option>
                            </Select>
                        </Form.Item>
                        <Divider />
                        <Form.Item
                            name="category"
                            label="Danh mục"
                            rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
                        >
                            <Select>
                                {Array.isArray(categories) && categories.length > 0 ? categories.map((category: any) => (
                                    <Option key={category?._id} value={category?._id}>{category?.name}</Option>
                                )) : <Option value="">Không có danh mục</Option>}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default AdminVideosAdd