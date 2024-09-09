'use client'
import React from 'react'
import { Button, Divider, Form, Input, Select, Switch, Upload, Row, Col } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const { Option } = Select

const AdminVideosAdd = () => {
    const [form] = Form.useForm()

    const onFinish = (values: any) => {
        console.log('Form values:', values)
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
                            valuePropName="fileList"
                            getValueFromEvent={(e) => {
                                if (Array.isArray(e)) {
                                    return e
                                }
                                return e && e.fileList
                            }}
                        >
                            <Upload name="poster" listType="picture">
                                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            name="status"
                            label="Trạng thái"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                        <Divider />
                        <Form.Item
                            name="isPublic"
                            label="Công khai"
                            valuePropName="checked"
                        >
                            <Switch />
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
                                <Option value="action">Hành động</Option>
                                <Option value="comedy">Hài hước</Option>
                                <Option value="drama">Kịch</Option>
                                {/* Thêm các danh mục khác tại đây */}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ backgroundColor: '#6A9C89', color: '#FFFFFF' }}>
                        Thêm video
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default AdminVideosAdd