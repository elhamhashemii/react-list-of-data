import { Divider, Form, Input, Modal } from "antd";

interface CollectionCreateFormProps {
  open: boolean;
  type: "add" | "edit";
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const AppModal: React.FC<CollectionCreateFormProps> = ({
  open,
  type,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const title = type === "add" ? "Add A New User" : "Edit User";
  const submitText = type === "add" ? "Add" : "Update";
  return (
    <Modal
      style={{ top: 20 }}
      open={open}
      title={title}
      okText={submitText}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onSubmit(values);
          })
          .catch((info) => {
            console.error("Validate Failed:", info);
          });
      }}
    >
      <Divider orientation="left" />
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          label="UserName"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="User Name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Website"
          name="website"
          rules={[{ required: true, message: "Please input your Website!" }]}
        >
          <Input placeholder="Website" />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please input your Phone!" }]}
        >
          <Input placeholder="Phone" />
        </Form.Item>
      </Form>
      <Divider orientation="left" />
    </Modal>
  );
};

export default AppModal;
