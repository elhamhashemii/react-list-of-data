import { Table, Button, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useContext, useState } from "react";
import UsersContext from "../context/UsersContext";
import AppModal from "./AppModal";

const UsersList = (props) => {
  const usersCtx = useContext(UsersContext);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleDelete = (record: any) => {
    usersCtx.onRemoveUser(record);
  };

  function toggleModal() {
    setShowModal(!showModal);
  }

  const handleEdit = (record: any) => {
    setShowModal(true);
    setFormData(record);
    console.log(formData);
    // HERE, you shouldnt pass the selected record
    // 1. Open a Modal
    // 2. Get new Values
    // 3. OnSubmit, pass new values to context
    // 4. In context, you can replace incoming userData with the previous
    // usersCtx.onEditUser(record);
    // props.onEdit(record)
  };

  const columns: ColumnsType<any> = [
    {
      title: "",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>,
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
    },
    {
      title: "Company",
      key: "company",
      dataIndex: "company",
      render: (company: { name: string }) => <div>{company.name}</div>,
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Username",
      key: "username",
      dataIndex: "website",
    },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
      render: (address: { street: string; suite: string; city: string }) => (
        <div>
          {address.city}, {address.street}, {address.suite}
        </div>
      ),
    },
    {
      title: "Zip Code",
      key: "address",
      dataIndex: "address",
      render: (address: { zipcode: string }) => <div>{address.zipcode}</div>,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
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
        onSubmit={toggleModal}
        onCancel={() => {
          setShowModal(false);
        }}
      />
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
