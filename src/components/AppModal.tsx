import { Divider, Form, Input, Modal, Radio } from "antd";

interface CollectionCreateFormProps {
  open: boolean;
  type: "add" | "edit";
  onSubmit: (values: any) => void;
  onCancel: () => void;
  userFieldValues?: any;
}

const AppModal: React.FC<CollectionCreateFormProps> = ({
  open,
  type,
  onSubmit,
  onCancel,
  userFieldValues,
}) => {
  const [form] = Form.useForm();
  form.setFieldsValue(userFieldValues);
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
          <Input placeholder="Name" type="text" />
        </Form.Item>
        <Form.Item
          label="UserName"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="User Name" type="text" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input placeholder="Email" type="email" />
        </Form.Item>
        <Form.Item
          label="Website"
          name="website"
          rules={[{ required: true, message: "Please input your Website!" }]}
        >
          <Input placeholder="Website" type="url" />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please input your Phone!" }]}
        >
          <Input placeholder="Phone" type="tell" />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please add your gender!" }]}
        >
          <Radio.Group>
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            <Radio value="other">Other</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
      <Divider orientation="left" />
    </Modal>
  );
};

export default AppModal;
