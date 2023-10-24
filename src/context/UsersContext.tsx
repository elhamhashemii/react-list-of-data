import React, { useReducer } from "react";
import { usersData } from "../data/users";
// const _ = require("lodash");

const UsersContext = React.createContext({
  users: [],
  onEditUser: (user, updatedUser) => {},
  onRemoveUser: (user) => {},
  onAddUser: (user) => {},
  onFilterUser: (filter) => {},
});

export default UsersContext;

function usersListReducer(state, action) {
  let updatedList;
  if (action.type === "EDIT") {
    updatedList = [...state];
    const editedUserIndex = updatedList.findIndex(
      (item) => item.id === action.item.user.id
    );
    updatedList[editedUserIndex] = {
      id: action.item.user.id,
      name: action.item.updatedUser.name,
      username: action.item.updatedUser.username,
      website: action.item.updatedUser.website,
      phone: action.item.updatedUser.phone,
      email: action.item.updatedUser.email,
      gender: action.item.updatedUser.gender,
    };
    return updatedList;
  } else if (action.type === "REMOVE") {
    updatedList = [...state];
    const removedUserIndex = updatedList.findIndex(
      (item) => item.id === action.item.id
    );
    updatedList.splice(removedUserIndex, 1);
    return updatedList;
  } else if (action.type === "ADD") {
    updatedList = [...state];
    let addedUser = {
      id: state.length + 1,
      name: action.item.name,
      username: action.item.username,
      email: action.item.email,
      website: action.item.website,
      phone: action.item.phone,
      gender: action.item.gender,
    };
    updatedList.push(addedUser);
    return updatedList;
  } else if (action.type === "FILTER") {
    updatedList = [...usersData];
    const filteredItem = action.item;
    const filteredArray = updatedList.filter((obj) =>
      Object.keys(filteredItem).some((key) =>
        obj[key].toUpperCase().includes(filteredItem[key].toUpperCase())
      )
    );
    return filteredArray;
  }
  return state;
}

export function UsersContextProvider(props) {
  const [usersList, dispatchUsersList] = useReducer(
    usersListReducer,
    usersData
  );

  function EditUserHandler(user, updatedUser) {
    dispatchUsersList({ type: "EDIT", item: { user, updatedUser } });
  }
  function RemoveUserHandler(user) {
    dispatchUsersList({ type: "REMOVE", item: user });
  }
  function AddUserHandler(user) {
    dispatchUsersList({ type: "ADD", item: user });
  }
  function filterUserHandler(filter) {
    dispatchUsersList({ type: "FILTER", item: filter });
  }

  return (
    <UsersContext.Provider
      value={{
        users: usersList,
        onEditUser: EditUserHandler,
        onRemoveUser: RemoveUserHandler,
        onAddUser: AddUserHandler,
        onFilterUser: filterUserHandler,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
}
