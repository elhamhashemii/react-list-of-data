import { useContext } from "react";
import { Input, Flex, Form, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import classes from "./UsersFilter.module.css";
import UsersContext from "../context/UsersContext";
import debounce from "lodash/debounce";

const UsersFilter = () => {
  const usersCtx = useContext(UsersContext);

  const [form] = Form.useForm();

  function filterHandler(changed, all) {
    const emptyFields = Object.values(all).every(
      (key) => key === undefined || key === ""
    );
    Object.keys(all).forEach(
      (key) => all[key] === undefined && delete all[key]
    );
    usersCtx.onFilterUser(all, emptyFields);
  }

  return (
    <>
      <Form
        form={form}
        className={classes.container}
        onValuesChange={debounce(
          (changes, all) => filterHandler(changes, all),
          2000
        )}
      >
        <Flex align="center" gap="large" wrap="wrap">
          <Form.Item style={{ marginBottom: "0px" }} name="name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }} name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }} name="website">
            <Input placeholder="Website" />
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }} name="phone">
            <Input placeholder="Phone number" />
          </Form.Item>

          <Button
            htmlType="submit"
            shape="circle"
            type="primary"
            // loading={isLoading}
            icon={<SearchOutlined />}
          />
        </Flex>
      </Form>
    </>
  );
};

export default UsersFilter;
