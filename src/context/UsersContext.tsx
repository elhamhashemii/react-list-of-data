import React, { useReducer } from "react";
import { usersData } from "../data/users";
// const _ = require("lodash");

const UsersContext = React.createContext({
  users: [],
  onEditUser: (user) => {},
  onRemoveUser: (user) => {},
  onAddUser: (user) => {},
  onFilterUser: (filter, isEmpty) => {},
});

export default UsersContext;

function usersListReducer(state, action) {
  let updatedList;
  if (action.type === "EDIT") {
    updatedList = [...state];
    const editedUserIndex = updatedList.findIndex(
      (item) => item.id === action.item.id
    );
    updatedList[editedUserIndex] = {
      // THE UPDATED DATA SHOULD BE REPLACED HERE
      id: 333,
      name: "elham",
      username: "ELHUISHIUD",
      website: "dddddddd",
      company: { name: "dddd" },
      phone: "dddddddd",
      zipcode: "dddddddd",
      address: "dddddddd",
      email: "dddddddd",
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
      address: { city: action.item.address, zipcode: action.item.zipcode },
      website: action.item.website,
      company: { name: action.item.name },
      phone: action.item.phone,
    };
    updatedList.push(addedUser);
    return updatedList;
  } else if (action.type === "FILTER") {
    if (action.item.isEmpty) {
      const initialArr = [...usersData];
      console.log("EMPTY >>>", state);
      return initialArr;
    } else {
      updatedList = [...state];
      const updatedItem = action.item.filter;
      const filteredArray = updatedList.filter((obj) =>
        Object.keys(updatedItem).some((key) =>
          obj[key].includes(updatedItem[key])
        )
      );
      return filteredArray;
    }
  }
  return state;
}

export function UsersContextProvider(props) {
  const [usersList, dispatchUsersList] = useReducer(
    usersListReducer,
    usersData
  );

  function EditUserHandler(user) {
    dispatchUsersList({ type: "EDIT", item: user });
  }
  function RemoveUserHandler(user) {
    dispatchUsersList({ type: "REMOVE", item: user });
  }
  function AddUserHandler(user) {
    dispatchUsersList({ type: "ADD", item: user });
  }
  function filterUserHandler(filter, isEmpty) {
    dispatchUsersList({ type: "FILTER", item: { filter, isEmpty } });
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
