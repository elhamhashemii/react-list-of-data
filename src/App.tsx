import classes from "./App.module.css";
import AddUser from "./components/AddUser";
import UsersFilter from "./components/UsersFilter";
import UsersList from "./components/UsersList";
import { Divider, Flex } from "antd";
import { UsersContextProvider } from "./context/UsersContext";
import { useState } from "react";
function App() {
  const [showModal, setShowModal] = useState(false);
  function toggleModalHandler() {
    setShowModal(!showModal);
  }

  return (
    <UsersContextProvider>
      <div className={classes.App}>
        <h1 className={classes.center}>Forms And Records</h1>
        <div className={classes.container}>
          <Divider orientation="left" orientationMargin="0">
            Users List
          </Divider>
          <UsersList
            header={() => (
              <Flex gap="middle" align="center" wrap="wrap">
                <div>Filter users</div> <UsersFilter />
              </Flex>
            )}
            footer={() => <AddUser onClick={toggleModalHandler} />}
          />
        </div>
      </div>
    </UsersContextProvider>
  );
}

export default App;
