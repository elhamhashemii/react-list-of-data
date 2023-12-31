import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import { useContext, useState } from "react";
import AppModal from "./AppModal";
import UsersContext from "../context/UsersContext";

function AddUser(props) {
  const [open, setOpen] = useState(false);
  const usersCtx = useContext(UsersContext);

  const onCreate = (values: any) => {
    usersCtx.onAddUser(values);
    setOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setOpen(true);
        }}
      >
        Add New User
      </Button>
      <AppModal
        type="add"
        open={open}
        onSubmit={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
}

export default AddUser;
