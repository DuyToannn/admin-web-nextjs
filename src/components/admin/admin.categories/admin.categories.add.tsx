import { handleCreateCategoryAction } from '@/utils/actions';
import {
    Modal, Input, Form, Row, Col, message,
    notification
} from 'antd';

interface IProps {
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (v: boolean) => void;
}

const AdminCategoriesAdd = (props: IProps) => {

    const {
        isCreateModalOpen, setIsCreateModalOpen, isUpdateModalOpen, setIsUpdateModalOpen
    } = props;
    const [form] = Form.useForm();

    const handleCloseCreateModal = () => {
        form.resetFields()
        setIsCreateModalOpen(false);
    }

    const onFinish = async (values: any) => {
        const res = await handleCreateCategoryAction(values);
        if (res?.data) {
            handleCloseCreateModal();
            message.success("Tạo danh mục thành công")
        } else {
            notification.error({
                message: "Create Category error",
                description: res?.message
            })
        }
    }
    return (
        <Modal
            title="Thêm danh mục"
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

export default AdminCategoriesAdd;