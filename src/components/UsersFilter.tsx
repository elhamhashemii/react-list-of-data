import { useState } from "react";
import { Input, Flex, Form, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import classes from "./UsersFilter.module.css";

const UsersFilter = () => {
  const [isLoading, setIsLoading] = useState(false);

  function onSubmitHandler(event: any) {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }

  return (
    <>
      <Form className={classes.container} onSubmitCapture={onSubmitHandler}>
        <Flex align="center" gap="large" wrap="wrap">
          <Form.Item style={{ marginBottom: "0px" }} name="username">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }} name="company">
            <Input placeholder="Company" />
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }} name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }} name="phone">
            <Input placeholder="Phone number" />
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }} name="address">
            <Input placeholder="Address" />
          </Form.Item>
          <Button
            htmlType="submit"
            shape="circle"
            type="primary"
            loading={isLoading}
            icon={<SearchOutlined />}
          />
        </Flex>
      </Form>
    </>
  );
};

export default UsersFilter;
