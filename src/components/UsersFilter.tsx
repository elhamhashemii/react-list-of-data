import { Button } from "antd";
import AppModal from "./AppModal";
import { useContext, useState } from "react";
import UsersContext from "../context/UsersContext";

function UsersFilter(props) {
  const [showModal, setShowModal] = useState(false);
  const usersCtx = useContext(UsersContext);

  function submitFilterModal(values: any) {
    setShowModal(false);
    Object.keys(values).forEach(
      (key) => values[key] === undefined && delete values[key]
    );
    usersCtx.onFilterUser(values);
  }
  return (
    <>
      <Button onClick={() => setShowModal(true)}>Filter</Button>
      <Button onClick={() => window.location.reload()}>Reset</Button>
      <AppModal
        type="filter"
        open={showModal}
        onSubmit={submitFilterModal}
        onCancel={() => {
          setShowModal(false);
        }}
      ></AppModal>
    </>
  );
}

export default UsersFilter;
