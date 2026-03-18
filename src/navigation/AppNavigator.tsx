import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import AddUserScreen from "../screens/AddUserScreen";
import LoginScreen from "../screens/LoginScreen";
import UserListScreen from "../screens/UserListScreen";
import UserDetailScreen from "../screens/UserDetailScreen";
import EditUserScreen from "../screens/EditUserScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={WelcomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Login" component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="AddUser" component={AddUserScreen}  options={{ headerShown: false }}/>
            <Stack.Screen name="UserList" component={UserListScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="UserDetail" component={UserDetailScreen} options={{ headerShown: false}} />
            <Stack.Screen name="EditUser" component={EditUserScreen} options={{ headerShown: false}}/>
        </Stack.Navigator>
    );
}