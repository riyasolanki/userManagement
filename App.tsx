import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch } from "react-redux";
import { store } from "./src/redux/store";
import AppNavigator from "./src/navigation/AppNavigator";
import { getUsers } from "./src/utils/storage";
import { setUsers } from "./src/redux/userSlice";

function RootApp() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initApp = async () => {
      const users = await getUsers();
      dispatch(setUsers(users));
    };

    initApp();
  }, []);

  return <AppNavigator />;
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootApp /> 
      </NavigationContainer>
    </Provider>
  );
}