import {
    Modal, Input, Form, Row, Col, message,
    notification
} from 'antd';
import { handleUpdateCategoryAction } from '@/utils/actions';
import { useEffect } from 'react';
interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (v: boolean) => void;
    dataUpdate: any;
    setDataUpdate: any;
}

const AdminCategoriesEdit = (props: IProps) => {

    const {
        isCreateModalOpen, setIsCreateModalOpen,
        dataUpdate, setDataUpdate
    } = props;
    const [form] = Form.useForm();

    const handleCloseCreateModal = () => {
        form.resetFields()
        setIsCreateModalOpen(false);
        setDataUpdate(null)
    }
    useEffect(() => {
        if (dataUpdate) {
            //code
            form.setFieldsValue({
                name: dataUpdate.name,
                description: dataUpdate.description,
            })
        }
    }, [dataUpdate])
    const onFinish = async (values: any) => {
        if (dataUpdate) {
            const { name, description } = values;
            const res = await handleUpdateCategoryAction({
                _id: dataUpdate._id, name, description
            })
            if (res?.data) {
                handleCloseCreateModal();
                message.success("Chỉnh sửa thành công")
            } else {
                notification.error({
                    message: "Update Category error",
                    description: res?.message
                })
            }

        }
    };

    return (
        <Modal
            title="Sửa danh mục"
            open={isCreateModalOpen}
            onOk={() => form.submit()}
            onCancel={() => handleCloseCreateModal()}
            maskClosable={false}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    name="name"
                    label="Tên danh mục"
                    rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AdminCategoriesEdit;