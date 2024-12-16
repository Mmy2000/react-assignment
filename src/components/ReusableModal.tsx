import React, { useEffect } from "react";
import { Modal, Form, Input, Typography } from "antd";
const { Text } = Typography;

interface ReusableModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onSubmit?: (values: any) => void;
  onConfirm?: () => void;
  mode?: "add" | "edit" | "delete";
  defaultValues?: { title?: string; body?: string };
  loading?: boolean;
}

const ReusableModal: React.FC<ReusableModalProps> = ({
  isOpen,
  title,
  onClose,
  onSubmit,
  onConfirm,
  mode = "add",
  defaultValues = {},
  loading = false,
}) => {
  const [form] = Form.useForm();

  // Update form fields when defaultValues change
  useEffect(() => {
    if (isOpen && mode === "add") {
      form.resetFields(); // Clear the form for "add" mode
    } else if (isOpen && defaultValues) {
      form.setFieldsValue(defaultValues); // Populate the form for "edit" mode
    }
  }, [isOpen, mode, defaultValues, form]);

  const handleOk = async () => {
    if (mode === "delete" && onConfirm) {
      onConfirm();
      return;
    }

    try {
      const values = await form.validateFields();
      if (onSubmit) onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const isFormMode = mode === "add" || mode === "edit";

  return (
    <Modal
      visible={isOpen}
      title={title}
      onCancel={onClose}
      onOk={handleOk}
      confirmLoading={loading}
      okText={mode === "delete" ? "Delete" : "Submit"}
      cancelText="Cancel"
    >
      {isFormMode ? (
        <Form form={form} initialValues={defaultValues} layout="vertical">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter a title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Body"
            name="body"
            rules={[{ required: true, message: "Please enter the body!" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      ) : (
        <Text type="danger">Are you sure you want to delete this post?</Text>
      )}
    </Modal>
  );
};

export default ReusableModal;
