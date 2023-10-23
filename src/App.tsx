import classes from "./App.module.css";
import AddUser from "./components/AddUser";
import UsersFilter from "./components/UsersFilter";
import UsersList from "./components/UsersList";
// import { usersData } from "./data/users";
import { Divider, Flex } from "antd";
import { UsersContextProvider } from "./context/UsersContext";
// import AppModal from "./components/AppModal";
import { useState } from "react";
// import Test from "./components/test";
function App() {
  const [showModal, setShowModal] = useState(false);
  function toggleModalHandler() {
    setShowModal(!showModal);
  }

  return (
    <UsersContextProvider>
      <div className={classes.App}>
        <h1 className={classes.center}>Forms And Records</h1>
        {/* <Test></Test> */}
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
