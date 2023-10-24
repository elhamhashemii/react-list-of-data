import { Table, Button, Popconfirm, Tag, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useContext, useState } from "react";
import UsersContext from "../context/UsersContext";
import AppModal from "./AppModal";
import type { NotificationPlacement } from "antd/es/notification/interface";

const UsersList = (props) => {
  const usersCtx = useContext(UsersContext);
  const [showModal, setShowModal] = useState(false);
  const [fieldValues, setFieldValues] = useState(null);
  const handleDelete = (record: any) => {
    usersCtx.onRemoveUser(record);
    openNotification("top", record);
  };

  const handleEdit = (record: any) => {
    setFieldValues(record);
    setShowModal(true);
  };

  function submitEditModal(values) {
    usersCtx.onEditUser(fieldValues, values);
    setShowModal(!showModal);
  }

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement, record: any) => {
    api.info({
      message: `User Removed!`,
      description: (
        <div>
          You deleted <b>{record.name}</b> from list.
        </div>
      ),
      placement,
    });
  };

  const columns: ColumnsType<any> = [
    {
      title: "",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Website",
      key: "website",
      dataIndex: "website",
      render: (text: string) => <a href={text}>{text}</a>,
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Username",
      key: "username",
      dataIndex: "username",
    },
    {
      title: "Gender",
      key: "gender",
      dataIndex: "gender",
      align: "center",
      render: (gender: string) => (
        <Tag
          color={
            gender === "male"
              ? "blue"
              : gender === "female"
              ? "magenta"
              : "success"
          }
        >
          {gender}
        </Tag>
      ),
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (index, record) => (
        <Button
          onClick={(e) => {
            handleEdit(record);
          }}
        >
          Edit
        </Button>
      ),
    },
    {
      title: "",
      dataIndex: "",
      align: "center",
      render: (_, record) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(record)}
        >
          <Button>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <AppModal
        type="edit"
        open={showModal}
        onSubmit={submitEditModal}
        onCancel={() => {
          setShowModal(false);
        }}
        userFieldValues={fieldValues}
      />
      {contextHolder}
      <Table
        columns={columns}
        dataSource={usersCtx.users}
        title={props.header}
        footer={props.footer}
        bordered
      ></Table>
    </>
  );
};

export default UsersList;
