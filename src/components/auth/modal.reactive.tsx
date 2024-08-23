'use client'
import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, notification, Steps } from 'antd';
import { useHasMounted } from '@/utils/customHook';
import { SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { sendRequest } from '@/utils/api';

const ModalReactive = (props: any) => {
    const { isModalOpen, setIsModalOpen, userEmail } = props;
    const [current, setCurrent] = useState(0);
    const hasMouted = useHasMounted()
    const [form] = Form.useForm();
    const [userId, setUserId] = useState('');
    useEffect(() => {
        if (userEmail) {
            form.setFieldValue('email', userEmail);
        }

    }, [userEmail])


    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    if (!hasMouted) return <></>
    const onFinishStep0 = async (value: any) => {
        const { email } = value;
        const res = await sendRequest<IBackendRes<any>>({
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/retry-active`,
            body: {
                email
            }
        })
        if (res?.data) {
            setUserId(res?.data?._id)
            setCurrent(1)
        } else {
            notification.error({
                message: "Register Error",
                description: res?.message
            })
        }
    }
    const onFinishStep1 = async (value: any) => {
        const { code } = value;
        const res = await sendRequest<IBackendRes<any>>({
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/check-code`,
            body: {
                code, _id: userId
            }
        })
        if (res?.data) {
            setUserId(res?.data?._id)
            setCurrent(2)
        } else {
            notification.error({
                message: "Register Error",
                description: res?.message
            })
        }
    }
    return (
        <div>
            <Modal
                title="Kích hoạt tài khoản"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                maskClosable={false}
                footer={true}

            >
                <Steps
                    current={current}
                    items={[
                        {
                            title: 'Login',
                            //        status: 'finish',
                            icon: <UserOutlined />,
                        },
                        {
                            title: 'Verification',
                            //          status: 'finish',
                            icon: <SolutionOutlined />,
                        },
                        {
                            title: 'Done',
                     //       status: 'wait',
                            icon: <SmileOutlined />,
                        },
                    ]}
                />
                {current === 0 &&
                    <div>
                        <div style={{ marginTop: 10 }}>
                            Tài khoản của bạn chưa được kích hoạt
                        </div>
                        <Form
                            name="verify"
                            autoComplete="off"
                            onFinish={onFinishStep0}
                            layout='vertical'
                            form={form}
                        >
                            <Form.Item
                                style={{ marginTop: 10 }}
                                name="email"


                                rules={[
                                    {
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input disabled />
                            </Form.Item>

                            <Form.Item
                            >
                                <Button type="primary" htmlType="submit">
                                    Resend
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                }

                {current === 1 &&
                    <>
                        <div style={{ marginTop: 10 }}>
                            Vui lòng nhập mã xác thực
                        </div>
                        <Form
                            name="verify2"
                            autoComplete="off"
                            onFinish={onFinishStep1}
                            layout='vertical'
                            form={form}
                        >
                            <Form.Item
                                style={{ marginTop: 10 }}
                                label="Code"
                                name="code"


                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập code !  ',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                            >
                                <Button type="primary" htmlType="submit">
                                    Resend
                                </Button>
                            </Form.Item>
                        </Form></>
                }

                {current === 2 &&
                    <>
                        <div style={{ marginTop: 10 }}>
                           Tài khoản của bạn đã được kích hoạt thành công, vui lòng đăng nhập lại
                        </div>
                    </>
                }
            </Modal>

        </div>
    )
}

export default ModalReactive